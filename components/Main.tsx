import { useState, useEffect, useRef } from 'react'
import SocialLogin from '@biconomy/web3-auth'
import Link from "next/link";
import Image from "next/image";
import { ChainId } from '@biconomy/core-types'
import { IBalances } from '@biconomy/node-client'
import { ethers } from 'ethers'
import SmartAccount from '@biconomy/smart-account'
import { css } from '@emotion/css'
import truncateEthAddress from 'truncate-eth-address'
import Head from "next/head";
import { Dialog } from "@headlessui/react";
import { BsArrowRight, BsArrowRightCircle, BsReverseLayoutTextSidebarReverse } from "react-icons/bs";
import { HiXMark } from "react-icons/hi2";
import Logo from "../Assets/Logo.jpg"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/Tutorials" },
  { name: "Learn", href: "/Team" },
  { name: "Weather", href: "/Weather" },
];
export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [smartAccount, setSmartAccount] = useState<SmartAccount | null>(null)
  const [interval, enableInterval] = useState<boolean>(false)
  const sdkRef = useRef<SocialLogin | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  
  useEffect(() => {
    let configureLogin
    if (interval) {
      configureLogin = setInterval(() => {
        if (!!sdkRef.current?.provider) {
          setupSmartAccount()
          clearInterval(configureLogin)
        }
      }, 1000)
    }
  }, [interval])

  async function login() {
    if (!sdkRef.current) {
      const socialLoginSDK = new SocialLogin()    
      await socialLoginSDK.init(ethers.utils.hexValue(ChainId.POLYGON_MUMBAI))
      sdkRef.current = socialLoginSDK
    }
    if (!sdkRef.current.provider) {
      sdkRef.current.showConnectModal()
      sdkRef.current.showWallet()
      enableInterval(true)
    } else {
      setupSmartAccount()
    }
  }

  async function setupSmartAccount() {
    if (!sdkRef?.current?.provider) return
    sdkRef.current.hideWallet()
    setLoading(true)
    const web3Provider = new ethers.providers.Web3Provider(
      sdkRef.current.provider
    )
    try {
      const smartAccount = new SmartAccount(web3Provider, {
        activeNetworkId: ChainId.POLYGON_MUMBAI,
        supportedNetworksIds: [ChainId.GOERLI, ChainId.POLYGON_MAINNET, ChainId.POLYGON_MUMBAI],
      })
      await smartAccount.init()
      setSmartAccount(smartAccount)
      setLoading(false)
      getBalance(smartAccount)
    } catch (err) {
      console.log('error setting up smart account... ', err)
    }
  }

  const logout = async () => {
    if (!sdkRef.current) {
      console.error('Web3Modal not initialized.')
      return
    }
    await sdkRef.current.logout()
    sdkRef.current.hideWallet()
    setSmartAccount(null)
    enableInterval(false)
  }

  async function getBalance(smartAccount: SmartAccount) {
    if (!smartAccount) return
    console.log('smartAccount: ', smartAccount)
    /* this function fetches the balance of the connected smart wallet */
    const balanceParams =  {
      chainId: ChainId.POLYGON_MUMBAI,
      eoaAddress: smartAccount.address,
      tokenAddresses: [],
    }
    console.log('smartAccount: ', smartAccount)
  }

  return (
    <div className='bgimg'>
    <Head>
      <title>Agri-Farm</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh7URB9z8geSc9dRXZlLWGR6xN9Rnj3uGu6A46goCqzIUYC4VuJ5v19VkB0QtuWiBLtgSvMPk0c9BH5umuzrRjt6qDp6LZ2t9ieTzqwbmISxYEZXn85aqhm9m0mF5kP9Uug0Bfl9c9T23xGzp4DdLxzu3R7U_-WBRpafGQf8sxnSptgnod_WwISJpJN/s320/Logo%20(3).png" />
    </Head>
    <header className='bg-gray-900 px-4'>
    <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
      <svg
        className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
        viewBox="0 0 1155 678"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
          fillOpacity=".3"
          d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
        />
        <defs>
          <linearGradient
            id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
            x1="1155.49"
            x2="-78.208"
            y1=".177"
            y2="474.645"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#9089FC" />
            <stop offset={1} stopColor="#FF80B5" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <div className="px-6 pt-6 lg:px-6">
      <div>
        <nav
          className="flex h-9 items-center justify-between"
          aria-label="Global"
        >
          <div className="flex lg:min-w-0 lg:flex-1 px-3 " aria-label="Global">
            <img
              className=" w-10  "
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh7URB9z8geSc9dRXZlLWGR6xN9Rnj3uGu6A46goCqzIUYC4VuJ5v19VkB0QtuWiBLtgSvMPk0c9BH5umuzrRjt6qDp6LZ2t9ieTzqwbmISxYEZXn85aqhm9m0mF5kP9Uug0Bfl9c9T23xGzp4DdLxzu3R7U_-WBRpafGQf8sxnSptgnod_WwISJpJN/s320/Logo%20(3).png"
              alt=""
            />

            <h1 className="h-8 px-5 text-3xl font-bold text-white">
              Agri-Farm
            </h1>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <BsReverseLayoutTextSidebarReverse className="h-6 w-6" />
            </button>
          </div>

          <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-end">
            <div className="hidden lg:flex lg:min-w-0 lg:flex-2 lg:justify-center lg:gap-x-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="font-semibold px-3 py-3 text-white hover:text-white"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="text-white  ">
            {
            loading && <p className='px-10'>Loading...</p>
            }
              {!!smartAccount && (
                   <p className='pl-5'>Smart account address:{truncateEthAddress(smartAccount.address)}</p>
              )}
            </div>
            {!!smartAccount ? (
              <button className="btn-grad ml-3 px-9 py-3" onClick={logout}>
                Logout
              </button>
            ) : (
              !smartAccount && !loading && <button className="btn-grad px-10 ml-5" onClick={login}>Login</button>
            )}
          </div>
        </nav>
        <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <Dialog.Panel
            focus="true"
            className="fixed inset-0 z-10 overflow-y-auto bg-black px-6 py-6 lg:hidden"
          >
            <div className="flex h-9 items-center justify-between">
              <div className="flex">
                <a href="#" className="-m-1.5 p-1.5">
                  <img
                    className=" w-20 "
                    src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh7URB9z8geSc9dRXZlLWGR6xN9Rnj3uGu6A46goCqzIUYC4VuJ5v19VkB0QtuWiBLtgSvMPk0c9BH5umuzrRjt6qDp6LZ2t9ieTzqwbmISxYEZXn85aqhm9m0mF5kP9Uug0Bfl9c9T23xGzp4DdLxzu3R7U_-WBRpafGQf8sxnSptgnod_WwISJpJN/s320/Logo%20(3).png"
                    alt=""
                  />
                </a>
              </div>
              <div className="flex">
                <button
                  type="button"
                  className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>

                  <HiXMark className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg py-3 px-3 text-base font-semibold leading-7 text-white hover:bg-gray-400/10"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </div>
    </div>
    </header>
    <main>
          <div className="pt-10 bg-gray-900 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
            <div className="mx-auto max-w-7xl lg:px-8">
              <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                  <div className="lg:py-[36px]">
                    <a
                      href="#"
                      className="inline-flex items-center text-white bg-black rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-gray-200"
                    >
                      <span className="px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full">
                        Agri
                      </span>
                      <span className="ml-4 text-sm">Farm with us in this path</span>
                      <BsArrowRightCircle className="ml-2 w-5 h-5 text-gray-500" aria-hidden="true" />
                    </a>
                    <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                      <span className="block">Supply Chain Management </span>
                      <span className="pb-3 block bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-cyan-400 sm:pb-5">
                      in Web3 farming
                      </span>
                    </h1>
                    <p className="text-base text-gray-300 sm:text-xl lg:text-lg xl:text-xl">
                      Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui Lorem cupidatat commodo. Elit
                      sunt amet fugiat veniam occaecat fugiat.
                    </p>
                    <div className="mt-10 sm:mt-12">
                      <div action="#" className="sm:max-w-xl sm:mx-auto lg:mx-0">
                        <div className="sm:flex">
                          
                          <div className="mt-3 sm:mt-0 sm:ml-3">
                            <Link href="/viewfarmer">
                            <button
                              type="submit"
                              className="block w-full py-3 px-4 rounded-md shadow bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900"
                            >
                             Let's dive in
                            </button>
                            </Link>
                          </div>
                        </div>
                        <p className="mt-3 text-sm text-gray-300 sm:mt-4">
                          Start your free 14-day trial, no credit card necessary. By providing your email, you agree to
                          our{' '}
                          <a href="#" className="font-medium text-white">
                            terms of service
                          </a>
                          .
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
                  <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                    {/* Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ */}
                    <img
                      className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                      src="https://tailwindui.com/img/component-images/cloud-illustration-teal-cyan.svg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
    </main>
  </div>
  )
}

