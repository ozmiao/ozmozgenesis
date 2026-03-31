🛸 Product Requirement Document (PRD): Ozmoz Genesis
1. Executive Summary (Ürün Vizyonu)
Ozmoz, dijital dünyadaki "ölü codebase" krizine karşı geliştirilmiş, AI tabanlı bir Restorasyon ve Kolektif Akıl platformudur. Terk edilmiş projelerin teknik DNA'sını analiz ederek, onları modern standartlara taşıyacak bir "Nöral Yol Haritası" sunar. Amacı, kayıp potansiyeli geri kazanmak ve açık kaynak dünyasında sürdürülebilir bir "Dijital Arkeoloji" hareketi başlatmaktır.

2. Core Strategic Pillars (Stratejik Sütunlar)
🧠 CP-1: Neural Code Archaeology (Deep Analysis)
Gereksinim: Platform, herhangi bir repository'nin mimari iskeletini (skeleton) ve teknik borçlarını (technical debt) saniyeler içinde saptamalıdır.

Teknik Çözüm: Google Gemini 1.5 Flash kullanılarak kodun "Dependency Graph"ı çıkarılır ve projenin canlanma olasılığını belirleyen "Revival Score" (0-100) hesaplanır.

🛠️ CP-2: Automated Modernization Roadmap (AMR)
Gereksinim: Sadece analiz yetmez; sistem projenin "nasıl" canlanacağını adım adım reçete etmelidir.

Teknik Çözüm: AI; kütüphane güncellemelerini, güvenlik açıklarını ve modern framework geçişlerini (Legacy -> Modern Stack) içeren dinamik bir dokümantasyon üretir.

👥 CP-3: The Revival Hub (Community Integration)
Gereksinim: Analiz edilen projeler "Mezarlıktan" çıkarılıp "Laboratuvara" (Topluluk Panosu) taşınmalıdır.

Teknik Çözüm: Kullanıcıların "Maintainer", "Reviewer" veya "Contributor" rolleriyle projelere dahil olabileceği bir mikro-ekosistem arayüzü.

3. Technical Requirements & Performance (Teknik Standartlar)
Architecture: React 18 + Vite (Zero-lag UI/UX).

AI Processing: Gemini API entegrasyonu ile "Context-Aware" analiz.

Environment Management: Güvenlik protokolleri gereği API anahtarları asla istemci tarafında (Client-side) tutulmaz; Netlify Secrets ve .env maskeleme kullanılır.

Response Time: AI analiz ve yol haritası üretim süreci 15 saniyeyi aşmamalıdır.

4. User Journey (Kullanıcı Deneyimi)
The Entry: Kullanıcı terk edilmiş projenin URL'ini veya ismini girer.

The Scan: Ozmoz, projenin "Technical DNA"sını tarar.

The Reveal: Görselleştirilmiş "Revival Score", teknoloji yığını ve modernizasyon rehberi sunulur.

The Action: Proje topluluğa açılır; canlandırma süreci resmi olarak başlar.

5. Risk Mitigation & Security
Data Privacy: Kod analizi sırasında kişisel veriler veya gizli anahtarlar taranmaz; sadece mimari yapıya odaklanılır.

Scalability: Proje, çoklu eşzamanlı analiz taleplerini karşılayacak şekilde asenkron yapıda (Async/Await) kurgulanmıştır.
