import { SearchBar } from './SearchBar'
import { MainRubricator } from './MainRubricator'
import { MainCommercial } from './MainCommercial'
import { Recommendations } from './Recommendations'

export function HomePage() {
  return (
    <div className="w-full">
      <div className="max-w-[576px] mx-auto flex flex-col gap-7 py-4 pb-[120px] md:pb-8">
        <SearchBar />
        <MainRubricator />
        <MainCommercial />
        <Recommendations />
      </div>
    </div>
  )
}
