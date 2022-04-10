import React from "react"
import styles from "./Footer.module.css"
// import sce from "./sce.png"
import youTube from "./youtube.png"
// import telegram from "./telegram.png"
import discord from "./discord.png"

// Khan Academy
const ADDRESS = "0x3f0E64D2Dc976F9cBa911d6D360b0c6fF104F80C"

function Footer() {
  return (
    <div className={styles.component}>
      {/* <div className={styles.row}>
        <img src={sce} alt="smart contract engineer" className={styles.sce} />
        <a href="https://www.smartcontract.engineer" target="__blank">
          Smart Contract Engineer
        </a>
      </div> */}
      <div className={styles.social}>
        <div className={styles.row}>
          <img src={discord} alt="discord" className={styles.discord} />
          <a
            href="https://discord.com/channels/953177494620602378/953177495841165381/960919226284130375"
            target="__blank"
          >
            Discord
          </a>
        </div>
        {/* <div className={styles.row}>
          <img src={telegram} alt="telegram" className={styles.telegram} />
          <a href="https://t.me/smartcontractprogrammer" target="__blank">
            Telegram
          </a>
        </div> */}
        <div className={styles.row}>
          <img src={youTube} alt="youtube" className={styles.youTube} />
          <a
            href="https://www.youtube.com/channel/UCv4y5qSUbJ8UC3CUmBPC_BA"
            target="__blank"
          >
            YouTube
          </a>
        </div>
      </div>
      {/* <div className={styles.row}>
        Donate
        <span role="img" aria-label="smiley">
          🙂
        </span>
      </div> */}
      <div className={styles.row}>
        <a href={`https://etherscan.io/address/${ADDRESS}`} target="__blank">
          {ADDRESS.slice(0, 6)}...{ADDRESS.slice(-6, -1)}
        </a>
      </div>
      {/* <div className={styles.row}>
        your ETH will directly go to
        <a href="https://khanacademy.org" target="__blank" className={styles.khan}>
          Khan Academy
        </a>
      </div> */}
      {/* <div className={styles.row}>
        <a href="mailto:contact@solidity-by-example.org">
          contact@solidity-by-example.org
        </a>
      </div> */}
      <div className={styles.row}>
        <a href="https://github.com/Web3DAO-CN/solidity-example" target="__blank">
          source
        </a>
        <div className={styles.bar}>|</div>
        <a
          href="https://github.com/Web3DAO-CN/solidity-example/blob/main/LICENSE"
          target="__blank"
        >
          license
        </a>
      </div>
    </div>
  )
}

export default Footer
