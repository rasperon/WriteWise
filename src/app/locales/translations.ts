interface Translation {
  appTitle: string;
  newTopic: string;
  loading: string;
  evaluating: string;
  evaluate: string;
  topic: string;
  example: string;
  writeMinThree: string;
  yourScore: string;
  showTips: string;
  footer: {
    adTitle: string;
    adText: string;
    developedBy: string;
    starProject: string;
    contactUs: string;
  };
  feedback: {
    grammar: string;
    coherence: string;
    vocabulary: string;
    total: string;
  };
  tips: {
    title: string;
    structure: string;
    structurePoint1: string;
    structurePoint2: string;
    structurePoint3: string;
    vocabulary: string;
    vocabularyPoint1: string;
    vocabularyPoint2: string;
    vocabularyPoint3: string;
    coherence: string;
    coherencePoint1: string;
    coherencePoint2: string;
    coherencePoint3: string;
  };
  errors: {
    pleaseEnterText: string;
    pleaseWriteThree: string;
    topicError: string;
    evaluationError: string;
  };
  languages: {
    tr: string;
    az: string;
  };
}

const translations: Record<string, Translation> = {
  tr: {
    appTitle: "WriteWise",
    newTopic: "Yeni Konu",
    loading: "Yükleniyor...",
    evaluating: "Değerlendiriliyor...",
    evaluate: "Değerlendir",
    topic: "Konu",
    example: "Örnek",
    writeMinThree: "En az 3 cümle yazın...",
    yourScore: "Puanınız",
    showTips: "İpuçlarını Göster",
    footer: {
      adTitle: "Özel Yazılım Çözümleri",
      adText: "Web uygulamaları, yapay zeka entegrasyonları ve özel yazılım çözümleri için profesyonel hizmet sunuyoruz. Modern teknolojiler ve yenilikçi yaklaşımlarla projelerinizi hayata geçiriyoruz.",
      developedBy: "Geliştirici: rasperon.c",
      starProject: "Projemizi beğendiyseniz GitHub'da yıldız vermeyi unutmayın!",
      contactUs: "İletişime Geç",
    },
    feedback: {
      grammar: "Dilbilgisi ve Yapı",
      coherence: "Tutarlılık ve Konu İlgisi",
      vocabulary: "Kelime Bilgisi",
      total: "Toplam Puan",
    },
    tips: {
      title: "Yazma İpuçları",
      structure: "Dilbilgisi ve Yapı",
      structurePoint1: "Cümlelerinizi farklı yapılarla çeşitlendirin (basit, bileşik, karmaşık)",
      structurePoint2: "Noktalama işaretlerini doğru kullanın",
      structurePoint3: "Zamanları tutarlı bir şekilde kullanın",
      vocabulary: "Kelime Kullanımı",
      vocabularyPoint1: "Tekrarlardan kaçının, eş anlamlı kelimeler kullanın",
      vocabularyPoint2: "Konuya özgü terimleri ve ifadeleri kullanın",
      vocabularyPoint3: "Bağlaçları etkili bir şekilde kullanın",
      coherence: "Tutarlılık ve Akış",
      coherencePoint1: "Fikirlerinizi mantıklı bir sırayla sunun",
      coherencePoint2: "Her cümlenin önceki ve sonraki cümlelerle bağlantısını kurun",
      coherencePoint3: "Ana konudan sapmadan yazın",
    },
    errors: {
      pleaseEnterText: "Lütfen bir metin girin.",
      pleaseWriteThree: "Lütfen en az 3 cümle yazın.",
      topicError: "Konu oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.",
      evaluationError: "Değerlendirme sırasında bir hata oluştu. Lütfen tekrar deneyin.",
    },
    languages: {
      tr: "Türkçe",
      az: "Azərbaycan dili",
    },
  },
  az: {
    appTitle: "WriteWise",
    newTopic: "Yeni Mövzu",
    loading: "Yüklənir...",
    evaluating: "Qiymətləndirilir...",
    evaluate: "Qiymətləndir",
    topic: "Mövzu",
    example: "Nümunə",
    writeMinThree: "Ən az 3 cümlə yazın...",
    yourScore: "Xalınız",
    showTips: "Məsləhətləri Göstər",
    footer: {
      adTitle: "Xüsusi Proqram Həlləri",
      adText: "Veb tətbiqləri, süni intellekt inteqrasiyaları və xüsusi proqram həlləri üçün peşəkar xidmət göstəririk. Müasir texnologiyalar və innovativ yanaşmalarla layihələrinizi həyata keçiririk.",
      developedBy: "Tərtibatçı: rasperon.c",
      starProject: "Layihəmizi bəyəndinizsə, GitHub-da ulduz verməyi unutmayın!",
      contactUs: "Əlaqə Saxlayın",
    },
    feedback: {
      grammar: "Qrammatika və Struktur",
      coherence: "Uyğunluq və Mövzu Əlaqəsi",
      vocabulary: "Söz Ehtiyatı",
      total: "Ümumi Xal",
    },
    tips: {
      title: "Yazı Məsləhətləri",
      structure: "Qrammatika və Struktur",
      structurePoint1: "Cümlələrinizi müxtəlif strukturlarla zənginləşdirin (sadə, mürəkkəb, qarışıq)",
      structurePoint2: "Durğu işarələrindən düzgün istifadə edin",
      structurePoint3: "Zamanlardan ardıcıl istifadə edin",
      vocabulary: "Söz İstifadəsi",
      vocabularyPoint1: "Təkrarlardan qaçının, sinonim sözlərdən istifadə edin",
      vocabularyPoint2: "Mövzuya uyğun terminlərdən və ifadələrdən istifadə edin",
      vocabularyPoint3: "Bağlayıcılardan effektiv istifadə edin",
      coherence: "Uyğunluq və Axıcılıq",
      coherencePoint1: "Fikirlərini məntiqi ardıcıllıqla təqdim edin",
      coherencePoint2: "Hər cümlənin əvvəlki və sonrakı cümlələrlə əlaqəsini qurun",
      coherencePoint3: "Əsas mövzudan yayınmadan yazın",
    },
    errors: {
      pleaseEnterText: "Zəhmət olmasa mətn daxil edin.",
      pleaseWriteThree: "Zəhmət olmasa ən az 3 cümlə yazın.",
      topicError: "Mövzu yaradılarkən xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.",
      evaluationError: "Qiymətləndirmə zamanı xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.",
    },
    languages: {
      tr: "Türkcə",
      az: "Azərbaycan dili",
    },
  },
};

export default translations; 