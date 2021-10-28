import { ethers } from 'hardhat'
import { solidity } from 'ethereum-waffle'
import { use, expect } from 'chai'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { MerkleTree } from 'merkletreejs'
import keccak256 from 'keccak256'
import { Wallet } from '@ethersproject/wallet'
import { ContractFactory } from '@ethersproject/contracts'

import { MemeNft } from '../src/types/MemeNft'
import { Weth9 } from '../src/types/Weth9'
import { MerkleRoyalties } from '../src/types/MerkleRoyalties'
import { BaseProvider } from '@ethersproject/providers'

export function hashToken(account: string, split: number) {
  return Buffer.from(ethers.utils.solidityKeccak256(['address', 'uint256'], [account, split]).slice(2), 'hex')
}

export const fastForwardBlocks = async (blocks: number) => {
  for (let index = 0; index < blocks; index++) {
    await ethers.provider.send('evm_mine', [])
  }
}

use(solidity)

// chai
//   .use(require('chai-as-promised'))
//   .should();

const zeroAddress = '0x0000000000000000000000000000000000000000'

describe('Meme NFT', function () {
  let meme: MemeNft
  let memeAsRemixer: MemeNft

  let Weth: ContractFactory
  let weth: Weth9
  let wethAsBob: Weth9

  let merkleRoyalties: MerkleRoyalties

  let provider: BaseProvider

  let author: SignerWithAddress
  let remixer: SignerWithAddress
  let remixer2: SignerWithAddress

  let MemeNft: ContractFactory
  let MerkleRoyalties: ContractFactory

  const testConfig = {
    baseRoyalties: 1000, // 10%
    basePrice: ethers.utils.parseEther('1'),
  }

  this.beforeAll(async function () {
    ;[author, remixer, remixer2] = await ethers.getSigners()
    MerkleRoyalties = await ethers.getContractFactory('MerkleRoyalties')
    MemeNft = await ethers.getContractFactory('MemeNFT')
    Weth = await ethers.getContractFactory('WETH9')
    provider = ethers.provider
  })

  beforeEach(async function () {
    weth = (await Weth.deploy()) as Weth9
    merkleRoyalties = (await MerkleRoyalties.deploy()) as MerkleRoyalties
    const memeAbstract = (await MemeNft.deploy('test', weth.address, merkleRoyalties.address)) as MemeNft
    meme = await memeAbstract.connect(author)
    memeAsRemixer = await memeAbstract.connect(remixer)
  })

  describe('constructor', function () {
    it('verify deployment parameters', async function () {})

    describe('mint primary', function () {
      it('Allows author to mint primary work with no prior tokens', async function () {
        const merkleTree = new MerkleTree([hashToken(author.address, 10000)], keccak256)
        await meme.mintPrimary('test', [], testConfig.baseRoyalties, merkleTree.getHexRoot(), testConfig.basePrice)
        expect(await meme.balanceOf(author.address, 0)).to.equal(1)
      })

      it('Allows remixer to remix if they own primary token', async function () {
        const merkleTree = new MerkleTree([hashToken(author.address, 10000)], keccak256)
        await meme.mintPrimary('test', [], testConfig.baseRoyalties, merkleTree.getHexRoot(), testConfig.basePrice)

        await memeAsRemixer.purchase(author.address, { value: ethers.utils.parseEther('1') })
        expect(await meme.balanceOf(remixer.address, 0)).to.equal(1)
        expect(await meme.balanceOf(remixer.address, 1)).to.equal(1)

        const newMemeAbstract = (await MemeNft.deploy('test', weth.address, merkleRoyalties.address)) as MemeNft
        const newMeme = await newMemeAbstract.connect(remixer)
        const newMerkleTree = new MerkleTree([hashToken(author.address, 5000), hashToken(remixer.address, 5000)], keccak256)
        await newMeme.mintPrimary('test', [meme.address], testConfig.baseRoyalties, newMerkleTree.getHexRoot(), testConfig.basePrice)
        expect(await newMeme.balanceOf(remixer.address, 0)).to.equal(1)
      })

      it('Allows remixer to remix if they recently sold the token', async function () {
        const merkleTree = new MerkleTree([hashToken(author.address, 10000)], keccak256)
        await meme.mintPrimary('test', [], testConfig.baseRoyalties, merkleTree.getHexRoot(), testConfig.basePrice)

        await memeAsRemixer.purchase(author.address, { value: ethers.utils.parseEther('1') })
        const memeAsRemixer2 = await memeAsRemixer.connect(remixer2)
        expect(memeAsRemixer2.purchase(remixer.address, { value: ethers.utils.parseEther('1') })).to.be.revertedWith('minimum purchase price not met')
        await memeAsRemixer2.purchase(remixer.address, { value: ethers.utils.parseEther('1.001') })

        const newMemeAbstract = (await MemeNft.deploy('test', weth.address, merkleRoyalties.address)) as MemeNft
        const newMeme = await newMemeAbstract.connect(remixer)
        const newMerkleTree = new MerkleTree([hashToken(author.address, 5000), hashToken(remixer.address, 5000)], keccak256)
        await newMeme.mintPrimary('test', [meme.address], testConfig.baseRoyalties, newMerkleTree.getHexRoot(), testConfig.basePrice)
        expect(await newMeme.balanceOf(remixer.address, 0)).to.equal(1)
      })
    })

    describe('royalties', function () {
      it('Allows author to claim royalties', async function () {
        const merkleTree = new MerkleTree([hashToken(author.address, 10000)], keccak256)
        await meme.mintPrimary('test', [], testConfig.baseRoyalties, merkleTree.getHexRoot(), testConfig.basePrice)

        await memeAsRemixer.purchase(author.address, { value: ethers.utils.parseEther('1') })
        expect(await meme.balanceOf(remixer.address, 0)).to.equal(1)

        const proof = merkleTree.getHexProof(hashToken(author.address, 10000))

        const balanceBefore = await provider.getBalance(author.address)
        const balanceRoyalties = await provider.getBalance(merkleRoyalties.address)
        console.log({ balanceRoyalties })

        expect(await merkleRoyalties.contractBalance(meme.address)).to.equal(ethers.utils.parseEther('0.1'))
        await merkleRoyalties.claim([meme.address], [proof], [10000])
        const balanceAfter = await provider.getBalance(author.address)
        console.log(balanceAfter.toString(), balanceBefore.toString())
        expect(balanceAfter.gt(balanceBefore)).to.be.true
        expect(await merkleRoyalties.contractBalance(meme.address)).to.equal(0)
      })
      it('Allows multple authors to claim royalties', async function () {
        const merkleTree = new MerkleTree([hashToken(author.address, 5000), hashToken(remixer2.address, 5000)], keccak256)
        // const merkleTree = new MerkleTree([hashToken(author.address, 5000)])
        await meme.mintPrimary('test', [], testConfig.baseRoyalties, merkleTree.getHexRoot(), testConfig.basePrice)

        await memeAsRemixer.purchase(author.address, { value: ethers.utils.parseEther('1') })
        expect(await meme.balanceOf(remixer.address, 0)).to.equal(1)

        const proof = merkleTree.getHexProof(hashToken(author.address, 5000))

        expect(await merkleRoyalties.contractBalance(meme.address)).to.equal(ethers.utils.parseEther('0.1'))
        await merkleRoyalties.claim([meme.address], [proof], [5000])
        
        expect(await merkleRoyalties.contractBalance(meme.address)).to.equal(ethers.utils.parseEther('0.05'))

        const merkleRoyaltiesAsRemixer2 = await merkleRoyalties.connect(remixer2)
        const proof2 = merkleTree.getHexProof(hashToken(remixer2.address, 5000))
        await merkleRoyaltiesAsRemixer2.claim([meme.address], [proof2], [5000])

        expect(await merkleRoyalties.contractBalance(meme.address)).to.equal(0)
      })
      // TODO
      // fails to claim royalties multiple times
      // badges expire went sent
      // badges extend if purchased again
      // mints badges
      // auction goes up
      // make bids
      // accept bids
      // does not give badge if transferred
      
      // Not implemented
      // Capped royalties
      // variable reuse based on cap
    })
  })
})
