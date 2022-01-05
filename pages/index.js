import Head from 'next/head'
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <div>
      <Head>
        <title>WhatsApp 2.0</title>
        <meta name="description" content="Clone of whatsapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sidebar/>
    </div>
  )
}
