import { ArrowLeft, Ellipsis, Heart } from 'lucide-react'

import { Button } from '@rollout/ui-kit'

export type ItemCardDetailNavBarProps = {
  isLiked?: boolean
  onLikeClick?: () => void
  onBackClick?: () => void
  onEllipsisClick?: () => void
}

export const ItemCardDetailNavBar = ({
  isLiked = false,
  onLikeClick,
  onBackClick,
  onEllipsisClick,
}: ItemCardDetailNavBarProps) => {
  return (
    <div className="flex gap-2 items-center py-0 w-full" data-state="nav-bar">
      <Button variant="ghost" size="icon" className="rounded-md" onClick={onBackClick} aria-label="Go back">
        <ArrowLeft className="size-6" />
      </Button>

      <div className="flex-1" />

      <Button variant="ghost" size="icon" className="rounded-md" onClick={onEllipsisClick} aria-label="More options">
        <Ellipsis className="size-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="rounded-md"
        onClick={onLikeClick}
        aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart className={`size-6 ${isLiked ? 'fill-current text-destructive' : ''}`} />
      </Button>
    </div>
  )
}
