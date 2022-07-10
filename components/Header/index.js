// import { Disclosure } from '@chakra-ui/react'
import { ColorModeToggle } from './colorModeToggle'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { MyButton } from '../Buttons/MyButton'
import { useState } from 'react'
import { tryAuthenticate } from '../../lib/ceramicFunctions'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reset, setConnection } from '../../app/evmSlice'
import { ethers } from 'ethers'


export default function Header() {
  const store = useSelector((state) => state.evm)
  const dispatch = useDispatch()

  // Manage Metamask changes and couple with state
  useEffect(() => {
    if (window?.ethereum?.isConnected()) {
      const chainId = ethers.utils.arrayify(window.ethereum.chainId, {
        hexPad: "left"
      })[0] || 1
      dispatch(setConnection({
        connected: true,
        account: window.ethereum.selectedAddress,
        chainId: chainId.toString(),
        // TODO: convert from hex to string
        // chainId: window.ethereum.chainId,
      }))
      window.ethereum.on('disconnect', () => {
        console.log("Metamask disconnected!")
        dispatch(reset())
      });
    }
  }, [dispatch])




  async function connectButtonHit() {
    if (!store.connected) {
      try {
        //When connecting with ceramic it has a modal to metamask
        const ceramic = (await tryAuthenticate())
        dispatch(setConnection({
          connected: true,
          account: window.ethereum.selectedAddress,
          chainId: '1', // TODO:
        }))
      } catch (e) {
        console.log("Error while connecting: ", e)
      }
    } else {
      // Reset the stored account
      dispatch(setConnection({
        connected: false,
        account: null,
      }))
    }
  }

  return (
    <>
      <div
        as="nav"
        className={`bg-gradient-to-b from-slate-800 via-slate-900 to-neutral-900 shadow-2xl z-30 opacity-100 sticky top-0`}
      >
        <div className=" mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <MyButton
              text={store.connected ? 'Disconnect' : 'Connect'}
              onClick={connectButtonHit}
              primary={false}
            />
            {store.connected &&
              <motion.div
                initial={false}
                animate={store.account ? 'visible' : 'hidden'}
                exit={{ opacity: 0 }}
                transition={{ ease: 'easeInOut', duration: 0.5 }}
                variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0, y: 500 },
                }}
                className="ml-3 px-3 py-1 bg-aqua-muted bg-opacity-30 hidden sm:flex rounded-tr-xl rounded-bl-xl text-aqua-muted hover:text-snow transition-colors duration-300 truncate text-sm"
              >
                {store.account}
              </motion.div>
            }
            <div className="items-center justify-center sm:items-stretch sm:justify-start ml-auto">
              {/* <div className="relative flex-shrink-0 flex text-white mr-auto"> */}
              <motion.div
                animate={{
                  // scale: [1, 2, 2, 2, 2, 1],
                  rotate: [0, 0, 16, -11, 0, 0],
                  // borderRadius: ['20%', '20%', '50%', '50%', '20%'],
                }}
                transition={{ duration: 2 }}
              >
                <Image
                  height={55}
                  width={111}
                  src="/ethereum-eth-logo-full-horizontal.svg"
                  alt="ETHsvg"
                />
              </motion.div>
              {/* </div> */}
              {/* <div className="flex-shrink-0 items-center text-white hidden sm:flex ">

              </div> */}
              {/* <div className="hidden sm:block sm:ml-6"></div> */}
            </div>
            <div className="sm:inset-auto sm:ml-6 ">
              {/** notifications */}
              {/* {AuthUser() ? <MenuLogado user={user} /> : <MenuNotLogado />} */}
              <ColorModeToggle />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
