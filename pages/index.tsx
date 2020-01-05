import { PlayerData, TeamData } from '../data/playerData'

type HomeProps = { playerData: PlayerData; teamData: TeamData }

function Home({ playerData, teamData }: HomeProps){
  return (
    <>
      <h1>Hello World!</h1>
    </>
  )
} 

Home.getInitialProps = async function() {
  const { playerData, teamData } = await import('../data/playerData')
  return { playerData, teamData }
}
export default Home
