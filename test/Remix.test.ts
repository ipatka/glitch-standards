import { ethers } from 'hardhat'
import { solidity } from 'ethereum-waffle'
import { use, expect } from 'chai'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

import { RemixNft } from '../src/types/RemixNft'
import { Wallet } from '@ethersproject/wallet'
import { ContractFactory } from '@ethersproject/contracts'

use(solidity)

// chai
//   .use(require('chai-as-promised'))
//   .should();

const zeroAddress = '0x0000000000000000000000000000000000000000'

const testKey = '0xdd631135f3a99e4d747d763ab5ead2f2340a69d2a90fab05e20104731365fde3'

describe('Remix NFT', function () {
  let remix: RemixNft
  let remixAsRemixer: RemixNft

  let address0: SignerWithAddress
  let author: Wallet
  let remixer: SignerWithAddress
  let admin: Wallet
  
  let RemixNft: ContractFactory
  
  this.beforeAll(async function() {
    const adminAbstract = new ethers.Wallet(testKey)
    const provider = ethers.provider
    author = await adminAbstract.connect(provider)
    ;[address0, remixer] = await ethers.getSigners()
    await address0.sendTransaction({to: author.address, value: ethers.utils.parseEther('10')})
    RemixNft = await ethers.getContractFactory('RemixNFT')
  })


  beforeEach(async function () {

    const remixAbstract = (await RemixNft.deploy('test')) as RemixNft
    remix = await remixAbstract.connect(author)
    remixAsRemixer = await remixAbstract.connect(remixer)

  })

  describe('constructor', function () {
    it('verify deployment parameters', async function () {
  })

  describe('mint primary', function () {
    it('Allows author to mint primary work with no derivative tokens', async function () {
      await remix.mintPrimary("test", [], [])
      expect(await remix.balanceOf(author.address, 0)).to.equal(1)
    })

    it('Allows remixer to mint reuse token', async function () {
      await remix.mintPrimary("test", [], [])
      await remixAsRemixer.mintReuse(5)
      expect(await remix.balanceOf(remixer.address, 1)).to.equal(5)
    })

    it('Allows remixer to mint license token with a valid signature', async function () {
      await remix.mintPrimary("test", [], [])
      const msgHash = ethers.utils.hashMessage(ethers.utils.arrayify(ethers.utils.solidityKeccak256(['uint256', 'address', 'address'], [1, remixer.address, remix.address])))
      const sig = await author.signMessage(msgHash)
      await remixAsRemixer.mintLicense(1, sig, author.address)
      expect(await remix.balanceOf(remixer.address, 2)).to.equal(1)
    })

    it('Allows remixer to mint new primary token with remix and license tokens from previous', async function () {
      await remix.mintPrimary("test", [], [])
      const msgHash = ethers.utils.hashMessage(ethers.utils.arrayify(ethers.utils.solidityKeccak256(['uint256', 'address', 'address'], [1, remixer.address, remix.address])))
      const sig = await author.signMessage(msgHash)
      await remixAsRemixer.mintLicense(1, sig, author.address)
      await remixAsRemixer.mintReuse(1)
      
      const newRemixAbstract = await RemixNft.deploy("test")
      const newRemix = (await newRemixAbstract.connect(remixer)) as RemixNft
      await remixAsRemixer.setApprovalForAll(newRemix.address, true)

      await newRemix.mintPrimary("test", [remix.address], [remix.address])
      

      expect(await newRemix.balanceOf(remixer.address, 0)).to.equal(1)
    })

  })
  })

})
