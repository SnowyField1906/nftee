import SmallCollection from "../../containers/Collection/SmallCollection"

function Galleries() {
  return (
    <div className='page-bg'>

      <div className="content-list-view">
        {
          [...Array(10)].map((_, i) => {
            return (
              <SmallCollection />
            )
          })
        }
      </div>
    </div>
  )
}

export default Galleries
