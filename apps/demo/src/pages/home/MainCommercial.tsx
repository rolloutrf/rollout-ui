import { BANNERS } from './data'

const GRADIENT =
  'radial-gradient(at 80% 80%, rgba(93,95,230,1) 0%, rgba(79,76,178,1) 27%, rgba(65,58,126,1) 46%, rgba(50,39,73,1) 65%, rgba(36,20,21,1) 84%)'

export function MainCommercial() {
  return (
    <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
      {BANNERS.map((b, i) => (
        <div
          key={b.id}
          className="flex-shrink-0 w-[calc(100vw-2.5rem)] max-w-[343px] aspect-[343/181] rounded-xl overflow-hidden border border-border snap-start flex items-center justify-center"
          style={{ backgroundImage: GRADIENT }}
        >
          <img
            src={b.imgUrl}
            alt=""
            className="w-full h-full object-contain"
            style={{
              transform: `scale(${(b.imgScale ?? 130) / 100}) translateY(${b.imgOffsetY ?? 0}%)`,
            }}
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />
        </div>
      ))}
    </div>
  )
}
