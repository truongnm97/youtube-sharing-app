import './Card.style.css'

export type TCardProps = {
  youtubeId: string
  author: string
}

export default function Card({ author, youtubeId }: TCardProps) {
  return (
    <section className='card'>
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}`}
        title='YouTube video player'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        allowFullScreen></iframe>
      <div className='card-info'>
        <p>Share by: {author}</p>
      </div>
    </section>
  )
}
