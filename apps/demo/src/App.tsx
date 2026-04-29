import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AppShell } from '@/components/layout/AppShell'
import { ContentSlot } from '@/components/layout/ContentSlot'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { ElectronicsPage } from '@/pages/electronics/ElectronicsPage'
import { FavoritesPage } from '@/pages/favorites/FavoritesPage'
import { FinancePage } from '@/pages/finance/FinancePage'
import { HomePage } from '@/pages/home/HomePage'
import { PersonalDataPage } from '@/pages/profile/PersonalDataPage'
import { ProfilePage } from '@/pages/profile/ProfilePage'
import { PromocodesPage } from '@/pages/profile/PromocodesPage'
import { FavoritesProvider } from '@/store/favorites'

export default function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <AppShell>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/electronics" element={<ElectronicsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/finance" element={<FinancePage />} />
            <Route path="/cart" element={<ContentSlot />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/personal-data" element={<PersonalDataPage />} />
            <Route path="/profile/promocodes" element={<PromocodesPage />} />
            <Route path="/assistant" element={<ContentSlot />} />
          </Routes>
          <Footer />
        </AppShell>
      </FavoritesProvider>
    </BrowserRouter>
  )
}
