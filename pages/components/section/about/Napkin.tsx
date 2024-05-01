import type { FC } from 'react';
import { useState, useEffect } from 'react'
import Image from 'next/image';

const Napkin: FC = () => {
  const size = [
    { w: 259, h: 291 },
    { w: 262, h: 277 },
    { w: 225, h: 251 },
    { w: 269, h: 289 },
    { w: 243, h: 306 },
    { w: 188, h: 240 },
    { w: 275, h: 264 },
    { w: 190, h: 204 },
    { w: 261, h: 204 },
    { w: 237, h: 227 },
    { w: 214, h: 245 },
    { w: 254, h: 278 },
    { w: 299, h: 251 },
  ]

  const pos = [
    { x: 78, y: 409 },
    { x: 233, y: 252 },
    { x: 418, y: 380 },
    { x: 509, y: 120 },
    { x: 620, y: 294 },
    { x: 843, y: 265 },
    { x: 905, y: 458 },
    { x: 1024, y: 295 },
    { x: 1031, y: 101 },
    { x: 1137, y: 382 },
    { x: 1218, y: 202 },
    { x: 1450, y: 166 },
    { x: 1521, y: 312 },
  ]

  const relativeVw = (intrinsicSize: number) => {
    return (intrinsicSize / 1920 * 100).toString() + "vw";
  }

  return (
    <div id='napkin' className='relative w-full'>
      <img src='Napkin.png' alt="napkin" className='w-full'/>
      <div>
        {pos.map((p, i) => (
          <>
            <img
              src={`/napkin/splat_${i + 1}_hover.png`}
              className='absolute'
              style={{ left: relativeVw(p.x), top: relativeVw(p.y), width: relativeVw(size[i].w) }}
              key={`splat-${i}-hover`}
            />
            <div className='absolute hover:hidden' style={{ left: relativeVw(p.x + size[i].w / 4), top: relativeVw(p.y + size[i].h / 4), width: relativeVw(size[i].w /2), height: relativeVw(size[i].h / 2) }}>
              <div className='relative pointer-events-none' style={{ left: '-50%', top: '-50%', width: relativeVw(size[i].w), height: relativeVw(size[i].h) }}>
                <img
                  src={`/napkin/splat_${i + 1}.png`}
                  className='absolute'
                  key={`splat-${i}`}
                />
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  )
}

export default Napkin;