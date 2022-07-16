// Table to display transaction details
import TimeAgo from 'timeago-react'
import { useDispatch, useSelector } from 'react-redux'
import { AddressTag } from '../addressTag'
import { CHAIN_INFO } from '../../constants/uniswap/chainInfo.ts'
import { ChainLogo } from '../chainLogo'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



export const PrettyTable = ({ transactions }) => {

  const store = useSelector((state) => state.evm)

  if (transactions.length === 0) {
    return (
      <div className="mx-auto mt-11 text-center">
        <p>No transactions</p>
      </div>
    )
  }

  const tableCols = ['chain', 'from', 'to', 'value', 'info']
  const tAttributes = ['block_signed_at', 'chain_id', 'from_address', 'to_address', 'value', 'to_address_label']

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <AddressTag address={store.account} />
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="shadow-sm ring-1 ring-black ring-opacity-5">
              <table className="min-w-full border-separate" style={{ borderSpacing: 0 }}>
                <thead className="">
                  <tr>
                    {tableCols.map((col) => (
                      <th
                        key={col}
                        scope="col"
                        className="sticky top-11 z-10 border-b border-slate-300 bg-indigo-100 dark:bg-indigo-900 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-slate-900 backdrop-blur backdrop-filter dark:text-slate-400 text-center"
                      >
                        {col.toUpperCase()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-snow dark:bg-slate-900">
                  {transactions.map((transaction, transactionIdx) => (
                    <tr key={transaction.email}>
                      <td
                        className={classNames(
                          transactionIdx !== transactions.length - 1 ? 'border-b border-slate-300 dark:border-slate-800' : '',
                          'whitespace-nowrap py-4 pl-4 pr-3 text-left text-xs font-medium text-slate-500 sm:pl-6 lg:pl-8 flex flex-col space-y-1 align-items-center content-center'
                        )}
                      >
                        <TimeAgo datetime={transaction.block_signed_at} />
                        <ChainLogo chainId={transaction.chain_id} />
                      </td>
                      <td
                        className={classNames(
                          transactionIdx !== transactions.length - 1 ? 'border-b border-slate-300 dark:border-slate-800' : '',
                          'whitespace-nowrap px-3 py-4 text-sm text-slate-500 hidden lg:table-cell'
                        )}
                      >
                        <AddressTag address={transaction.from_address} />
                      </td>
                      <td
                        className={classNames(
                          transactionIdx !== transactions.length - 1 ? 'border-b border-slate-300 dark:border-slate-800' : '',
                          'whitespace-nowrap px-3 py-4 text-sm text-slate-500'
                        )}
                      >
                        <AddressTag address={transaction.to_address} />
                      </td>
                      <td
                        className={classNames(
                          transactionIdx !== transactions.length - 1 ? 'border-b border-slate-300 dark:border-slate-800' : '',
                          'whitespace-nowrap px-3 py-4 text-sm text-slate-500'
                        )}
                      >
                        {parseFloat(transaction.value / Math.pow(10, 18)).toPrecision()}
                      </td>
                      <td
                        className={classNames(
                          transactionIdx !== transactions.length - 1 ? 'border-b border-slate-300 dark:border-slate-800' : '',
                          'whitespace-nowrap px-3 py-4 text-sm text-slate-500'
                        )}
                      >
                        {transaction.to_address_label || '🏴‍☠️'}
                      </td>
                      <td
                        className={classNames(
                          transactionIdx !== transactions.length - 1 ? 'border-b border-slate-300 dark:border-slate-800' : '',
                          'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-6 lg:pr-8'
                        )}
                      >
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          Add<span className="sr-only">, {transaction.from_address}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}