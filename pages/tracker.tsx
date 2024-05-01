import type { NextPage } from 'next';
import { useState, useEffect } from "react"
import { paramCase, capitalCase } from 'change-case';
import { intervalToDuration, addHours, setMinutes, setSeconds } from 'date-fns';

const RarityTracker: NextPage = () => {
  const [metadata, setMetadata] = useState(null as any);
  const [selectedTokenId, setSelectedTokenId] = useState(0);
  const [selectedTrait, setSelectedTrait] = useState("skin");
  const [livingOdds, setLivingOdds] = useState([] as any);
  const [gameState, setGameState] = useState(null as any);
  const [countdownTime, setCountdownTime] = useState(null as any);
  const getMetadata = async (tokenId: number) => {
    const json = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tokens/metadata/${tokenId}`).then(res => res.json());
    return json
  }

  const getGameState = async () => {
    const json = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/game-state`).then(res => res.json());
    return json?.data?.attributes
  }

  const getLivingOdds = async (limit: number = 10) => {
    const json = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tokens/living/by-rarity`).then(res => res.json());
    if (Array.isArray(json)) return json.slice(0, limit)
    return []
  }

  function pad(value: number | undefined) {
    if (value == undefined) return "00"
    if (value < 10) {
      return '0' + value;
    } else {
      return value;
    }
  }
  const countdown = () => {
    const now = new Date();
    let end = setSeconds(setMinutes(addHours(new Date(), 1), 0), 0);
    const diff = intervalToDuration({
      start: now,
      end: end
    })

    setCountdownTime(`${pad(diff.hours)}: ${pad(diff.minutes)}: ${pad(diff.seconds)}`);
  }

  const changeTokenId = async (e: any) => {
    setSelectedTokenId(e.target.value)
    const json = await getMetadata(e.target.value)
    setMetadata(json)
  }

  useEffect(() => {
    changeTokenId({ target: { value: 0 } })
    getGameState().then((json) => {
      setGameState(json)
    })
    getLivingOdds().then((odds: object[]) => {
      setLivingOdds(odds)
    })
    setInterval(() => { countdown() }, 1000)
  }, []);

  const traitButtons = ["Skin", "Neck", "Mouth", "Eyes", "Nose", "Head", "Ears"]

  return (
    <div className='justify-center text-center relative z-10 min-h-[80vw]'>
      <div className="hidden lg:block w-[87vw] mx-auto text-white relative lg:text-[1vw] z-50">
        <img className="hidden lg:block absolute z-40 top-[-2vw] left-0 w-full" src="/rarity-tracker/screen.png" />
        <div className="relative lg:top-[5.5vw] z-50">

          <h1 className="font-zomby text-[3vw] uppercase bold black-text-outline">Rarity Tracker</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 my-[2vw] lg:w-[70vw] lg:h-[18.5vw] mx-auto gap-4">
            <div className="text-left">
              <h2 className="lg:text-[1.6vw] text-[#EF03E7] uppercase">Trait: <span className="text-teal-400">{selectedTrait}</span></h2>
              <ul>
                {gameState?.traitNamesByType?.[selectedTrait]?.map((name: string, i: number) => {
                  return (<li key={`trait-rarity-${i}`} className="flex flex-nowrap">
                    <div className="whitespace-nowrap">{capitalCase(name)} </div>
                    <div className="flex-grow text-clip overflow-hidden"> ..........................................................</div>
                    <div> {gameState?.traitCounts?.[name]}</div>
                  </li>)
                }).slice(0, 10)}
              </ul>
            </div>
            <div className="text-left">
              <div className=" grid grid-cols-2">
                <div className="text-[1.6vw] text-[#EF03E7] uppercase">
                  Search
                </div>
                <div>
                  <input type="text" className="bg-white rounded-sm p-1 text-black text-[1.2vw] w-[8vw]" onChange={changeTokenId} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="mb-[1vw] text-teal-400">Rarity score: {metadata?.rarityScore}</h3>
                  <ul>
                    {metadata?.attributes?.map((attr: any, i: number) => {
                      return (<li key={`attr-${i}`} className="flex flex-nowrap max-w-[100%]">
                        <div className="whitespace-nowrap">{attr.trait_value} </div>
                        <div className="flex-grow text-clip overflow-hidden"> ..........................................................</div>
                        <div> {gameState?.traitCounts?.[paramCase(attr.trait_value)]}</div>
                      </li>)
                    }).slice(0, 8)}
                  </ul>
                </div>
                <div>
                  <h2 className="text-[1vw] mb-[1vw] text-right text-teal-400">Odd #{selectedTokenId}</h2>
                  <iframe src={`${process.env.NEXT_PUBLIC_VIEWER_URL}/${selectedTokenId}`} className="w-full h-full lg:h-[11vw] lg:w-[11vw]"></iframe>
                </div>
              </div>
            </div>
            <div className="text-left">
              <h2 className="text-[1.6vw] text-[#EF03E7] uppercase">Leaderboard</h2>
              <ul>
                {Array.isArray(livingOdds) && livingOdds.map((odd: any, i: number) => {
                  return (<li key={`top-tokens-${i}`} className="flex flex-nowrap max-w-[100%]">
                    <div className="whitespace-nowrap">{i + 1}) oDD # {odd.tokenId} </div>
                    <div className="flex-grow text-clip overflow-hidden">..........................................................</div>
                    <div> {odd.rarityScore}</div>
                  </li>)
                })}
              </ul>
            </div>

          </div>

          <div className="grid grid-cols-7 gap-1 w-[77vw] mx-auto">
            {traitButtons.map((trait, i) => (
              <button key={`trait-button-${i}`} onClick={() => {
                setSelectedTrait(paramCase(trait))
              }}
                className="rounded-md text-[#EF03E7] uppercase relative"
              >
                <img src="/rarity-tracker/trait-button-background.png" className="w-full absolute" />
                <div className="relative z-20 top-[.5vw] font-zomby text-[2vw]"> {trait} </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="hidden lg:block mx-auto w-[80vw] relative z-30 top-[27.5vw]">
        <div className="grid grid-cols-3 relative text-white">
          <div className="relative">
            <img src="/rarity-tracker/counter-box.png" className="absolute w-full top-0 left-0" />
            <h2 className="text-[2vw] text-left pl-[2vw] top-[5.5vw] uppercase relative z-10">
              <span className="font-zomby">Chowtime : </span>
              <span className="text-teal-400">{countdownTime}</span></h2>
          </div>
          <div className="relative">
            <img src="/rarity-tracker/counter-box.png" className="absolute w-full top-0 left-0" />
            <h2 className="text-[2vw] text-left pl-[2vw] top-[5.5vw] uppercase relative z-10">
              <span className="font-zomby">Calendaargh : </span>
              <span className="text-teal-400">Day {gameState?.currentRound}</span></h2>
          </div>
          <div className="relative">
            <img src="/rarity-tracker/counter-box.png" className="absolute w-full top-0 left-0" />
            <h2 className="text-[2vw] text-left pl-[2vw] top-[5.5vw] uppercase relative z-10">
              <span className="font-zomby">Total Active Odds : </span>
              <span className="text-teal-400">{gameState?.oddsRemaining}</span></h2>
          </div>
        </div>
      </div>
      <img src="/rarity-tracker/display-case.png" className="hidden lg:block absolute z-40 w-full top-[25vw]" />
    </div>
  );
};

export default RarityTracker;
