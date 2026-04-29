import { MainCommercial } from './MainCommercial'
import { MainRubricator } from './MainRubricator'
import { Recommendations } from './Recommendations'
import { SearchBar } from './SearchBar'

export function HomePage() {
  return (
    <div className="w-full">
      <div className="max-w-[576px] mx-auto flex flex-col gap-7 pt-20 pb-[120px] md:pb-8">
        <SearchBar />
        <MainRubricator />
        <MainCommercial />
        <Recommendations />
      </div>
    </div>
  )
}
