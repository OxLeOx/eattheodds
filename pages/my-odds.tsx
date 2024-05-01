import type { NextPage } from 'next';
import { useAccount, useContractRead, useContractReads, usePrepareContractWrite, useContractWrite, useProvider } from 'wagmi';
import { useState, useEffect } from 'react';
import deployments from '../contracts/deployments.json';
import abi from '../abi/EatTheOdds.json';
import { ethers } from 'ethers';

const MyOdds: NextPage = () => {

  const provider = useProvider() as any;
  const { address } = useAccount();
  const [odds, setOdds] = useState([] as number[]);
  const [ownerToIdList, setOwnerToIdList] = useState({} as any);

  const contractAddress = deployments['goerli']?.address as string;
  const launchBlock = deployments['goerli']?.launchBlock as number;

  const [quantity, setQuantity] = useState(1);

  const logTransfers = async () => {
    let map = {} as any
    try {
      const logs = await provider?.getLogs({
        fromBlock: launchBlock,
        toBlock: 'latest',
        address: contractAddress,
        topics: [provider?.interface?.getEventTopic('Transfer')]
      })

      for (const log of logs) {
        let [txHash, from, to, id] = log.topics;
        id = parseInt(id)
        to = to.replace('0x000000000000000000000000', '0x')
        from = from.replace('0x000000000000000000000000', '0x')
        to = ethers.utils.getAddress(to)
        from = ethers.utils.getAddress(from)
        console.log('log', to, from);

        if (!map[from]) {
          map[from] = new Set()
        }
        if (!map[to]) {
          map[to] = new Set()
        }
        // add to owner
        map[to].add(id)
        map[from].delete(id)
      }
      console.log(map)
      setOwnerToIdList(map)

    } catch (e) {
      console.log(e);
    }
  }



  const { config: configMint } = usePrepareContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: 'airdropQuantity',
    args: [address, quantity],
    overrides: {
      gasLimit: ethers.BigNumber.from(1000000),
    }
  })

  const { data, isLoading: isLoadingMint, isSuccess: isSuccessMint, write: writeMint } = useContractWrite(configMint as any)

  const nftContract = {
    address: contractAddress,
    abi: abi
  }


  const { data: contractData, isError, isLoading, isFetched } = useContractReads({
    contracts: [
      {
        ...nftContract,
        functionName: 'owner',
      },
      {
        ...nftContract,
        functionName: 'totalSupply',
      },
    ],
  });

  let [contractOwner, totalSupply] = contractData || [];
  totalSupply = Number(totalSupply);

  const getOddsList = (address: string | undefined) => {
    console.log('getOddsList', address, ownerToIdList);
    // TODO: get a list of the odds this wallet owns
    if (!address) return
    if (!ownerToIdList[address]) return []

    const ids: number[] = Array.from(ownerToIdList[address])

    setOdds(ids)
  }

  const isOwner = () => address === contractOwner

  useEffect(() => {
    logTransfers();
  }, []);
  useEffect(() => {
    getOddsList(address);
  }, [ownerToIdList])

  return (
    <div className='justify-center text-center'>
      <main className="container mx-auto text-white">
        <section className="text-center max-w-md mx-auto py-8 bg-gray-800 my-8">
          <h1 className="text-4xl font-bold text-center">Mint - Testing</h1>
          <div className="max-w-md grid grid-cols-3 my-8 mx-auto text-white text-center text-[1vw]">
            <div className="self-center">
              <button className="mx-auto text-center" onClick={() => { setQuantity(Math.max(1, quantity - 1)) }}>-</button>
            </div>
            <div className="self-center">
              <input type="text" className="mx-auto text-center block bg-transparent text-white w-[5rem]" min-value="1" value={quantity} readOnly />
            </div>
            <div>
              <button onClick={() => { setQuantity(quantity + 1) }}>+</button>
            </div>
          </div>
          <div>
            <button
              className="bg-white text-gray-600 p-4 px-8 font-zomby text-2xl hover:bg-fuchsia-600 disabled:text-white disabled:bg-black"
              disabled={!writeMint} onClick={() => { writeMint?.() }}>Mint</button>
          </div>
          <div className="mt-8">
            <p>This wallet is the contract owner: {isOwner()}</p>
            <p>
              Visit contract on <a className="underline hover:text-[#EF03E7]" href={`https://goerli.etherscan.io/address/${contractAddress}`} target="_blank" rel="noreferrer">Etherscan</a>
            </p>
          </div>
        </section>

        <section>
          <h1 className="text-3xl">My Odds</h1>
          <p> List of my odds. Are the ghosts? Rarity score. Images. Join Snacking queue.  Did they win? </p>
          <div>
            <>Total Supply: {totalSupply}
            </></div>
          <div>Launch block: {launchBlock}</div>
          <div>Number of Odds in wallet: {odds?.length}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {odds?.map((id) => {
              return (
                <div key={"odd-token-" + id} className="py-8">
                  <h3>Odd #{id}</h3>
                  <iframe src={`https://odd-viewer.netlify.app/${id}`} width="100%" height="100%" frameBorder="0" />
                </div>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MyOdds;
