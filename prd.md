# 🛸 Product Requirement Document (PRD): Ozmoz Genesis

## 1. Executive Summary (Ürün Vizyonu)
**Ozmoz**, dijital dünyadaki "ölü codebase" krizine karşı geliştirilmiş, AI tabanlı bir **Restorasyon ve Kolektif Akıl** platformudur. Terk edilmiş projelerin teknik DNA'sını analiz ederek, onları modern standartlara taşıyacak bir **"Nöral Yol Haritası"** sunar. Amacı; kayıp potansiyeli geri kazanmak ve açık kaynak dünyasında sürdürülebilir bir **"Dijital Arkeoloji"** hareketi başlatmaktır.

---

## 2. Core Strategic Pillars (Stratejik Sütunlar)

### 🧠 CP-1: Neural Code Archaeology (Deep Analysis)
* **Gereksinim:** Platform, herhangi bir repository'nin mimari iskeletini (skeleton) ve teknik borçlarını (technical debt) saniyeler içinde saptamalıdır.
* **Teknik Çözüm:** **Google Gemini 1.5 Flash** kullanılarak kodun "Dependency Graph"ı çıkarılır ve projenin canlanma olasılığını belirleyen **"Revival Score" (0-100)** hesaplanır.

### 🛠️ CP-2: Automated Modernization Roadmap (AMR)
* **Gereksinim:** Sadece analiz yetmez; sistem projenin "nasıl" canlanacağını adım adım reçete etmelidir.
* **Teknik Çözüm:** AI; kütüphane güncellemelerini, güvenlik açıklarını ve modern framework geçişlerini (Legacy -> Modern Stack) içeren dinamik bir dokümantasyon üretir.

### 👥 CP-3: The Revival Hub (Community Integration)
* **Gereksinim:** Analiz edilen projeler "Mezarlıktan" çıkarılıp "Laboratuvara" (Topluluk Panosu) taşınmalıdır.
* **Teknik Çözüm:** Kullanıcıların "Maintainer", "Reviewer" veya "Contributor" rolleriyle projelere dahil olabileceği bir mikro-ekosistem arayüzü.

---

## 3. Technical Requirements & Performance (Teknik Standartlar)

| Kategori | Spesifikasyon |
| :--- | :--- |
| **Architecture** | React 18 + Vite (Zero-lag UI/UX) |
| **AI Processing** | Gemini API entegrasyonu ile "Context-Aware" analiz |
| **Security** | API anahtarları asla Client-side'da tutulmaz; Netlify Secrets kullanılır |
| **Performance** | Analiz ve yol haritası üretim süreci < 15 saniye |
| **Data Privacy** | Sadece mimari yapı taranır; kişisel veri/anahtar taranmaz |

---

## 4. User Journey (Kullanıcı Deneyimi)

1.  **The Entry:** Kullanıcı terk edilmiş projenin URL'ini veya ismini sisteme girer.
2.  **The Scan:** Ozmoz, projenin "Technical DNA"sını ve bağımlılıklarını tarar.
3.  **The Reveal:** Görselleştirilmiş **Revival Score**, modern teknoloji yığını ve restorasyon rehberi sunulur.
4.  **The Action:** Proje topluluğa açılır; kolektif canlandırma süreci resmi olarak başlar.

---

## 5. Risk Mitigation & Security

* **Scalability:** Proje, çoklu eşzamanlı analiz taleplerini karşılayacak şekilde asenkron yapıda (`Async/Await`) kurgulanmıştır.
* **Safety:** Kod analizi sırasında sadece mimari şablonlara odaklanılır, hassas veri sızıntısı engellenir.

---
> **Status:** Finalized for Buildathon Submission
> **Author:** Özge Özyorulmaz
