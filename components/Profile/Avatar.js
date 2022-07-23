import Image from "next/image"

export function Avatar({ src, scale }) {

  const saveSrc = src === 'https://pbs.twimg.com/profile_images/12098984010/CryptoPanda_400x400.jpg'
  ? 'https://i.etsystatic.com/21689229/r/il/bce321/2406492170/il_570xN.2406492170_dgxu.jpg'
  : src

  console.log(src)
  return (
    <div
      className={`flex flex-grow aspect-1`}
    >
      <Image
        className="rounded-full bg-indigo-400 dark:bg-neonPurple "
        layout="fill"
        src={
          saveSrc ||
          '/blocqBookLogo/icon/blocqbookTransparent2.png'
        }
        alt="avatar"
      />
    </div>
  )
}
