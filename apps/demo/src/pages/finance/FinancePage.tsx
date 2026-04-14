import { SearchBar } from '@/pages/home/SearchBar'
import { AccountCard } from './AccountCard'
import { AnalyticWidgets } from './AnalyticWidgets'
import { PromotionCard } from './PromotionCard'
import { TransactionHistory } from './TransactionHistory'
import { TransferWidget } from './TransferWidget'
import { CurrencyRates } from './CurrencyRates'
import { PaymentsWidget } from './PaymentsWidget'
import { ProductsGrid } from './ProductsGrid'
import { SelfEmployment } from './SelfEmployment'
import { PartnersWidget } from './PartnersWidget'
import { MoreProducts } from './MoreProducts'

export function FinancePage() {
  return (
    <div className="w-full">
      <div className="max-w-[576px] mx-auto flex flex-col gap-7 py-4 pb-[120px] md:pb-8">
        <SearchBar />
        <div data-section="account"><AccountCard /></div>
        <div data-section="analytics"><AnalyticWidgets /></div>
        <div data-section="promo"><PromotionCard /></div>
        <div data-section="history"><TransactionHistory /></div>
        <div data-section="transfers"><TransferWidget /></div>
        <div data-section="currencies"><CurrencyRates /></div>
        <div data-section="payments"><PaymentsWidget /></div>
        <div data-section="products"><ProductsGrid /></div>
        <div data-section="selfemployment"><SelfEmployment /></div>
        <div data-section="partners"><PartnersWidget /></div>
        <div data-section="moreproducts"><MoreProducts /></div>
      </div>
    </div>
  )
}
