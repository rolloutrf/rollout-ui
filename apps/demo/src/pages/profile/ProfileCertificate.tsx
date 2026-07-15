import { Button } from '@rollout/ui-kit'
import { Card } from '@rollout/ui-kit'
import { Separator } from '@rollout/ui-kit'
import { useState } from 'react'

interface Certificate {
  id: string
  title: string
  description: string
  date: string
  used: boolean
}

const initialCertificates: Certificate[] = [
  { id: '1', title: 'Товары за 1 ₽', description: 'до 28 октября', date: 'до 28 октября', used: false },
  { id: '2', title: '−90% на товары', description: 'до 23 декабря 10:46', date: 'до 23 декабря 10:46', used: false },
  { id: '3', title: 'Товары за 1 ₽', description: 'до 28 октября', date: 'до 28 октября', used: true },
]

export function ProfileCertificate() {
  const [certificates, setCertificates] = useState<Certificate[]>(initialCertificates)

  const handleApply = (id: string) => {
    setCertificates(certificates.map(cert => 
      cert.id === id ? {...cert, used: true} : cert
    ))
  }

  return (
    <div className="max-w-[576px] mx-auto pt-20 px-4">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold">Сертификаты</h3>
        </div>
        
        <div className="space-y-4">
          {certificates.map((certificate) => (
            <Card key={certificate.id} className="p-4 bg-card rounded-lg">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 14H3C2.44772 14 2 13.5523 2 13V6C2 5.44772 2.44772 5 3 5H13C13.5523 5 14 5.44772 14 6V13C14 13.5523 13.5523 14 13 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 9L11.4286 5.5C11.1111 5.07143 10.5556 4.85714 10 4.85714H6C5.44444 4.85714 4.88889 5.07143 4.57143 5.5L2 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 9H6.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M10 9H10.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{certificate.title}</h4>
                  <p className="text-sm text-muted-foreground">{certificate.description}</p>
                </div>
                
                <Button 
                  size="sm" 
                  variant={certificate.used ? "outline" : "default"}
                  onClick={() => handleApply(certificate.id)}
                  disabled={certificate.used}
                >
                  {certificate.used ? 'Применён' : 'Применить'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-8 space-y-3">
          <Button className="w-full">
            Добавить
          </Button>
          <Button variant="outline" className="w-full">
            Оформить
          </Button>
        </div>
      </div>
      
      <Separator className="my-6" />
      
      <div className="bg-card rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-2">Частые вопросы</h4>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Как использовать сертификаты?</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default ProfileCertificate