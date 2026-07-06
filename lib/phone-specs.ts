export interface PhoneSpecDetails {
  network: {
    technology: string;
    bands2g: string;
    bands3g: string;
    bands4g: string;
    bands5g: string;
    speed: string;
  };
  launch: {
    announced: string;
    status: string;
  };
  body: {
    dimensions: string;
    weight: string;
    build: string;
    sim: string;
    resistance?: string;
  };
  display: {
    type: string;
    size: string;
    resolution: string;
    protection: string;
    features?: string;
  };
  platform: {
    os: string;
    chipset: string;
    cpu: string;
    gpu: string;
  };
  memory: {
    cardSlot: string;
    internal: string;
  };
  mainCamera: {
    modules: string;
    features: string;
    video: string;
  };
  selfieCamera: {
    modules: string;
    features: string;
    video: string;
  };
  sound: {
    loudspeaker: string;
    jack35mm: string;
  };
  comms: {
    wlan: string;
    bluetooth: string;
    positioning: string;
    nfc: string;
    radio: string;
    usb: string;
  };
  features: {
    sensors: string;
  };
  battery: {
    type: string;
    charging: string;
  };
  misc: {
    colors: string;
    models: string;
    price: string;
  };
}

export interface PhoneSpec {
  id: string;
  name: string;
  brand: string;
  slug: string;
  image: string;
  releasedYear: number;
  type: 'Smartphone' | 'Tablet';
  youtubeUrl: string;
  specs: PhoneSpecDetails;
}

export const PHONE_SPECS: PhoneSpec[] = [
  {
  "id": "samsung-galaxy-s24-ultra-new",
  "name": "Samsung Galaxy S24 Ultra",
  "brand": "Samsung",
  "slug": "samsung-galaxy-s24-ultra",
  "releasedYear": 2024,
  "type": "Smartphone",
  "image": "https://images.pexels.com/photos/11216260/pexels-photo-11216260.jpeg?auto=compress&cs=tinysrgb&w=800",
  "youtubeUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "specs": {
    "network": {
      "technology": "GSM / HSPA / LTE / 5G",
      "bands2g": "GSM 850 / 900",
      "bands3g": "HSDPA 850 / 900",
      "bands4g": "LTE",
      "bands5g": "SA/NSA/Sub6",
      "speed": "5G"
    },
    "launch": {
      "announced": "2024, January",
      "status": "Released 2024"
    },
    "body": {
      "dimensions": "162.3 x 79.0 x 8.6 mm",
      "weight": "232 g",
      "build": "Titanium frame",
      "sim": "Nano-SIM + eSIM",
      "resistance": "IP68"
    },
    "display": {
      "type": "Dynamic LTPO AMOLED 2X, 120Hz",
      "size": "6.8 inches",
      "resolution": "3120 x 1440",
      "protection": "Corning Gorilla Armor"
    },
    "platform": {
      "os": "Android 14",
      "chipset": "Snapdragon 8 Gen 3 for Galaxy",
      "cpu": "Octa-core",
      "gpu": "Adreno 750"
    },
    "memory": {
      "cardSlot": "No",
      "internal": "256GB 12GB RAM, 512GB 12GB RAM, 1TB 12GB RAM"
    },
    "mainCamera": {
      "modules": "200 MP + 50 MP + 10 MP + 12 MP",
      "features": "LED flash, HDR",
      "video": "8K@30fps"
    },
    "selfieCamera": {
      "modules": "12 MP",
      "features": "HDR",
      "video": "4K@60fps"
    },
    "sound": {
      "loudspeaker": "Yes",
      "jack35mm": "No"
    },
    "comms": {
      "wlan": "Wi-Fi 7",
      "bluetooth": "5.3",
      "positioning": "GPS",
      "nfc": "Yes",
      "radio": "No",
      "usb": "USB Type-C 3.2"
    },
    "features": {
      "sensors": "Fingerprint (ultrasonic)"
    },
    "battery": {
      "type": "5000 mAh",
      "charging": "45W wired"
    },
    "misc": {
      "colors": "Titanium Black",
      "models": "SM-S928B",
      "price": "Rp 21.999.000"
    }
  }
},
  {
  "id": "samsung-galaxy-s24-plus",
  "name": "Samsung Galaxy S24+",
  "brand": "Samsung",
  "slug": "samsung-galaxy-s24-plus",
  "releasedYear": 2024,
  "type": "Smartphone",
  "image": "https://images.pexels.com/photos/11216260/pexels-photo-11216260.jpeg?auto=compress&cs=tinysrgb&w=800",
  "youtubeUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "specs": {
    "network": {
      "technology": "GSM / HSPA / LTE / 5G",
      "bands2g": "GSM 850 / 900",
      "bands3g": "HSDPA 850 / 900",
      "bands4g": "LTE",
      "bands5g": "SA/NSA/Sub6",
      "speed": "5G"
    },
    "launch": {
      "announced": "2024, January",
      "status": "Released 2024"
    },
    "body": {
      "dimensions": "158.5 x 75.9 x 7.7 mm",
      "weight": "196 g",
      "build": "Armor Aluminum 2",
      "sim": "Dual SIM + eSIM",
      "resistance": "IP68"
    },
    "display": {
      "type": "Dynamic LTPO AMOLED 2X, 120Hz",
      "size": "6.7 inches",
      "resolution": "3120 x 1440",
      "protection": "Gorilla Glass Victus 2"
    },
    "platform": {
      "os": "Android 14",
      "chipset": "Exynos 2400 for Galaxy",
      "cpu": "Deca-core",
      "gpu": "Xclipse 940"
    },
    "memory": {
      "cardSlot": "No",
      "internal": "256GB 12GB RAM, 512GB 12GB RAM"
    },
    "mainCamera": {
      "modules": "50 MP + 10 MP + 12 MP",
      "features": "LED flash, HDR",
      "video": "8K@30fps"
    },
    "selfieCamera": {
      "modules": "12 MP",
      "features": "HDR",
      "video": "4K@60fps"
    },
    "sound": {
      "loudspeaker": "Yes",
      "jack35mm": "No"
    },
    "comms": {
      "wlan": "Wi-Fi 6e",
      "bluetooth": "5.3",
      "positioning": "GPS",
      "nfc": "Yes",
      "radio": "No",
      "usb": "USB Type-C 3.2"
    },
    "features": {
      "sensors": "Fingerprint (ultrasonic)"
    },
    "battery": {
      "type": "4900 mAh",
      "charging": "45W wired"
    },
    "misc": {
      "colors": "Onyx Black",
      "models": "SM-S926B",
      "price": "Rp 16.999.000"
    }
  }
},
  {
  "id": "samsung-galaxy-s24",
  "name": "Samsung Galaxy S24",
  "brand": "Samsung",
  "slug": "samsung-galaxy-s24",
  "releasedYear": 2024,
  "type": "Smartphone",
  "image": "https://images.pexels.com/photos/11216260/pexels-photo-11216260.jpeg?auto=compress&cs=tinysrgb&w=800",
  "youtubeUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "specs": {
    "network": {
      "technology": "GSM / HSPA / LTE / 5G",
      "bands2g": "GSM 850 / 900",
      "bands3g": "HSDPA 850 / 900",
      "bands4g": "LTE",
      "bands5g": "SA/NSA/Sub6",
      "speed": "5G"
    },
    "launch": {
      "announced": "2024, January",
      "status": "Released 2024"
    },
    "body": {
      "dimensions": "147 x 70.6 x 7.6 mm",
      "weight": "167 g",
      "build": "Armor Aluminum 2",
      "sim": "Dual SIM + eSIM",
      "resistance": "IP68"
    },
    "display": {
      "type": "Dynamic LTPO AMOLED 2X, 120Hz",
      "size": "6.2 inches",
      "resolution": "2340 x 1080",
      "protection": "Gorilla Glass Victus 2"
    },
    "platform": {
      "os": "Android 14",
      "chipset": "Exynos 2400",
      "cpu": "Deca-core",
      "gpu": "Xclipse 940"
    },
    "memory": {
      "cardSlot": "No",
      "internal": "128GB 8GB RAM, 256GB 8GB RAM, 512GB 8GB RAM"
    },
    "mainCamera": {
      "modules": "50 MP + 10 MP + 12 MP",
      "features": "LED flash, HDR",
      "video": "8K@30fps"
    },
    "selfieCamera": {
      "modules": "12 MP",
      "features": "HDR",
      "video": "4K@60fps"
    },
    "sound": {
      "loudspeaker": "Yes",
      "jack35mm": "No"
    },
    "comms": {
      "wlan": "Wi-Fi 6e",
      "bluetooth": "5.3",
      "positioning": "GPS",
      "nfc": "Yes",
      "radio": "No",
      "usb": "USB Type-C 3.2"
    },
    "features": {
      "sensors": "Fingerprint (ultrasonic)"
    },
    "battery": {
      "type": "4000 mAh",
      "charging": "25W wired"
    },
    "misc": {
      "colors": "Onyx Black",
      "models": "SM-S921B",
      "price": "Rp 13.999.000"
    }
  }
},
  {
  "id": "samsung-galaxy-a57-5g",
  "name": "Samsung Galaxy A57 5G",
  "brand": "Samsung",
  "slug": "samsung-galaxy-a57-5g",
  "releasedYear": 2026,
  "type": "Smartphone",
  "image": "https://images.pexels.com/photos/11216260/pexels-photo-11216260.jpeg?auto=compress&cs=tinysrgb&w=800",
  "youtubeUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "specs": {
    "network": {
      "technology": "GSM / HSPA / LTE / 5G",
      "bands2g": "GSM 850 / 900",
      "bands3g": "HSDPA 850 / 900",
      "bands4g": "LTE",
      "bands5g": "SA/NSA/Sub6",
      "speed": "5G"
    },
    "launch": {
      "announced": "2026, March",
      "status": "Coming soon"
    },
    "body": {
      "dimensions": "Ultra-slim 6.9 mm",
      "weight": "179 g",
      "build": "Glass front, aluminum frame",
      "sim": "Dual SIM",
      "resistance": "IP68"
    },
    "display": {
      "type": "Super AMOLED Plus, 120Hz",
      "size": "6.7 inches",
      "resolution": "1080 x 2400",
      "protection": "Gorilla Glass Victus",
      "features": "1900 nits"
    },
    "platform": {
      "os": "Android 16",
      "chipset": "Exynos 1680",
      "cpu": "Octa-core",
      "gpu": "Xclipse 550"
    },
    "memory": {
      "cardSlot": "microSDXC",
      "internal": "128GB 8GB RAM, 256GB 12GB RAM"
    },
    "mainCamera": {
      "modules": "50 MP + 12 MP + 5 MP",
      "features": "LED flash, HDR",
      "video": "4K@30fps"
    },
    "selfieCamera": {
      "modules": "32 MP",
      "features": "HDR",
      "video": "4K@30fps"
    },
    "sound": {
      "loudspeaker": "Yes",
      "jack35mm": "No"
    },
    "comms": {
      "wlan": "Wi-Fi 6",
      "bluetooth": "5.3",
      "positioning": "GPS",
      "nfc": "Yes",
      "radio": "No",
      "usb": "USB Type-C 2.0"
    },
    "features": {
      "sensors": "Fingerprint (optical), Awesome Intelligence"
    },
    "battery": {
      "type": "5000 mAh",
      "charging": "45W wired"
    },
    "misc": {
      "colors": "Awesome Black",
      "models": "SM-A576B",
      "price": "Rp 6.999.000"
    }
  }
},
  {
  "id": "samsung-galaxy-a26-5g",
  "name": "Samsung Galaxy A26 5G",
  "brand": "Samsung",
  "slug": "samsung-galaxy-a26-5g",
  "releasedYear": 2025,
  "type": "Smartphone",
  "image": "https://images.pexels.com/photos/11216260/pexels-photo-11216260.jpeg?auto=compress&cs=tinysrgb&w=800",
  "youtubeUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "specs": {
    "network": {
      "technology": "GSM / HSPA / LTE / 5G",
      "bands2g": "GSM 850 / 900",
      "bands3g": "HSDPA 850 / 900",
      "bands4g": "LTE",
      "bands5g": "SA/NSA/Sub6",
      "speed": "5G"
    },
    "launch": {
      "announced": "2025, March",
      "status": "Coming soon"
    },
    "body": {
      "dimensions": "161 x 78 x 8.2 mm",
      "weight": "200 g",
      "build": "Plastic back",
      "sim": "Dual SIM",
      "resistance": "IP67"
    },
    "display": {
      "type": "Super AMOLED, 120Hz",
      "size": "6.7 inches",
      "resolution": "1080 x 2400",
      "protection": "Gorilla Glass Victus+"
    },
    "platform": {
      "os": "Android 15",
      "chipset": "Exynos 1380",
      "cpu": "Octa-core",
      "gpu": "Mali-G68"
    },
    "memory": {
      "cardSlot": "microSDXC",
      "internal": "128GB 8GB RAM, 256GB 8GB RAM"
    },
    "mainCamera": {
      "modules": "50 MP + 8 MP + 2 MP",
      "features": "LED flash, HDR",
      "video": "4K@30fps"
    },
    "selfieCamera": {
      "modules": "13 MP",
      "features": "HDR",
      "video": "1080p@30fps"
    },
    "sound": {
      "loudspeaker": "Yes",
      "jack35mm": "No"
    },
    "comms": {
      "wlan": "Wi-Fi 6",
      "bluetooth": "5.3",
      "positioning": "GPS",
      "nfc": "Yes",
      "radio": "No",
      "usb": "USB Type-C 2.0"
    },
    "features": {
      "sensors": "Fingerprint (optical)"
    },
    "battery": {
      "type": "5000 mAh",
      "charging": "25W wired"
    },
    "misc": {
      "colors": "Awesome Blue",
      "models": "SM-A266B",
      "price": "Rp 3.999.000"
    }
  }
},
  {
  "id": "samsung-galaxy-a17-5g",
  "name": "Samsung Galaxy A17 5G",
  "brand": "Samsung",
  "slug": "samsung-galaxy-a17-5g",
  "releasedYear": 2025,
  "type": "Smartphone",
  "image": "https://images.pexels.com/photos/11216260/pexels-photo-11216260.jpeg?auto=compress&cs=tinysrgb&w=800",
  "youtubeUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "specs": {
    "network": {
      "technology": "GSM / HSPA / LTE / 5G",
      "bands2g": "GSM 850 / 900",
      "bands3g": "HSDPA 850 / 900",
      "bands4g": "LTE",
      "bands5g": "SA/NSA/Sub6",
      "speed": "5G"
    },
    "launch": {
      "announced": "2025, March",
      "status": "Coming soon"
    },
    "body": {
      "dimensions": "7.5 mm thickness",
      "weight": "190 g",
      "build": "Plastic back",
      "sim": "Dual SIM",
      "resistance": "IP54"
    },
    "display": {
      "type": "Super AMOLED, 90Hz",
      "size": "6.7 inches",
      "resolution": "1080 x 2400",
      "protection": "Gorilla Glass Victus"
    },
    "platform": {
      "os": "Android 15",
      "chipset": "Exynos 1330",
      "cpu": "Octa-core",
      "gpu": "Mali-G68"
    },
    "memory": {
      "cardSlot": "microSDXC",
      "internal": "128GB 8GB RAM, 256GB 8GB RAM"
    },
    "mainCamera": {
      "modules": "50 MP + 5 MP + 2 MP",
      "features": "LED flash, HDR",
      "video": "1080p@30fps"
    },
    "selfieCamera": {
      "modules": "13 MP",
      "features": "HDR",
      "video": "1080p@30fps"
    },
    "sound": {
      "loudspeaker": "Yes",
      "jack35mm": "No"
    },
    "comms": {
      "wlan": "Wi-Fi 5",
      "bluetooth": "5.3",
      "positioning": "GPS",
      "nfc": "Yes",
      "radio": "No",
      "usb": "USB Type-C 2.0"
    },
    "features": {
      "sensors": "Fingerprint (side-mounted)"
    },
    "battery": {
      "type": "5000 mAh",
      "charging": "25W wired"
    },
    "misc": {
      "colors": "Awesome Black",
      "models": "SM-A176B",
      "price": "Rp 2.999.000"
    }
  }
},
  {
  "id": "samsung-galaxy-a16-5g",
  "name": "Samsung Galaxy A16 5G",
  "brand": "Samsung",
  "slug": "samsung-galaxy-a16-5g",
  "releasedYear": 2024,
  "type": "Smartphone",
  "image": "https://images.pexels.com/photos/11216260/pexels-photo-11216260.jpeg?auto=compress&cs=tinysrgb&w=800",
  "youtubeUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "specs": {
    "network": {
      "technology": "GSM / HSPA / LTE / 5G",
      "bands2g": "GSM 850 / 900",
      "bands3g": "HSDPA 850 / 900",
      "bands4g": "LTE",
      "bands5g": "SA/NSA/Sub6",
      "speed": "5G"
    },
    "launch": {
      "announced": "2024, March",
      "status": "Released"
    },
    "body": {
      "dimensions": "161 x 78 x 8.4 mm",
      "weight": "200 g",
      "build": "Plastic back",
      "sim": "Dual SIM",
      "resistance": "IP54"
    },
    "display": {
      "type": "Super AMOLED, 90Hz",
      "size": "6.7 inches",
      "resolution": "1080 x 2400",
      "protection": "Glass"
    },
    "platform": {
      "os": "Android 14",
      "chipset": "Dimensity 6300",
      "cpu": "Octa-core",
      "gpu": "Mali-G57"
    },
    "memory": {
      "cardSlot": "microSDXC",
      "internal": "128GB 4GB RAM, 256GB 6GB RAM"
    },
    "mainCamera": {
      "modules": "50 MP + 5 MP + 2 MP",
      "features": "LED flash, HDR",
      "video": "1080p@30fps"
    },
    "selfieCamera": {
      "modules": "13 MP",
      "features": "HDR",
      "video": "1080p@30fps"
    },
    "sound": {
      "loudspeaker": "Yes",
      "jack35mm": "Yes"
    },
    "comms": {
      "wlan": "Wi-Fi 5",
      "bluetooth": "5.3",
      "positioning": "GPS",
      "nfc": "Yes",
      "radio": "No",
      "usb": "USB Type-C 2.0"
    },
    "features": {
      "sensors": "Fingerprint (side-mounted)"
    },
    "battery": {
      "type": "5000 mAh",
      "charging": "25W wired"
    },
    "misc": {
      "colors": "Awesome Blue",
      "models": "SM-A166B",
      "price": "Rp 2.499.000"
    }
  }
},
  {
  "id": "samsung-galaxy-a15-5g",
  "name": "Samsung Galaxy A15 5G",
  "brand": "Samsung",
  "slug": "samsung-galaxy-a15-5g",
  "releasedYear": 2024,
  "type": "Smartphone",
  "image": "https://images.pexels.com/photos/11216260/pexels-photo-11216260.jpeg?auto=compress&cs=tinysrgb&w=800",
  "youtubeUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "specs": {
    "network": {
      "technology": "GSM / HSPA / LTE / 5G",
      "bands2g": "GSM 850 / 900",
      "bands3g": "HSDPA 850 / 900",
      "bands4g": "LTE",
      "bands5g": "SA/NSA/Sub6",
      "speed": "5G"
    },
    "launch": {
      "announced": "2023, December",
      "status": "Released"
    },
    "body": {
      "dimensions": "160.1 x 76.8 x 8.4 mm",
      "weight": "200 g",
      "build": "Plastic back",
      "sim": "Dual SIM",
      "resistance": "No"
    },
    "display": {
      "type": "Super AMOLED, 90Hz",
      "size": "6.5 inches",
      "resolution": "1080 x 2340",
      "protection": "Glass"
    },
    "platform": {
      "os": "Android 14",
      "chipset": "Dimensity 6100+",
      "cpu": "Octa-core",
      "gpu": "Mali-G57"
    },
    "memory": {
      "cardSlot": "microSDXC",
      "internal": "128GB 8GB RAM, 256GB 8GB RAM"
    },
    "mainCamera": {
      "modules": "50 MP + 5 MP + 2 MP",
      "features": "LED flash, HDR",
      "video": "1080p@30fps"
    },
    "selfieCamera": {
      "modules": "13 MP",
      "features": "HDR",
      "video": "1080p@30fps"
    },
    "sound": {
      "loudspeaker": "Yes",
      "jack35mm": "Yes"
    },
    "comms": {
      "wlan": "Wi-Fi 5",
      "bluetooth": "5.3",
      "positioning": "GPS",
      "nfc": "Yes",
      "radio": "No",
      "usb": "USB Type-C 2.0"
    },
    "features": {
      "sensors": "Fingerprint (side-mounted)"
    },
    "battery": {
      "type": "5000 mAh",
      "charging": "25W wired"
    },
    "misc": {
      "colors": "Awesome Black",
      "models": "SM-A156B",
      "price": "Rp 2.899.000"
    }
  }
},
  {
  "id": "samsung-galaxy-a07-5g",
  "name": "Samsung Galaxy A07 5G",
  "brand": "Samsung",
  "slug": "samsung-galaxy-a07-5g",
  "releasedYear": 2026,
  "type": "Smartphone",
  "image": "https://images.pexels.com/photos/11216260/pexels-photo-11216260.jpeg?auto=compress&cs=tinysrgb&w=800",
  "youtubeUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "specs": {
    "network": {
      "technology": "GSM / HSPA / LTE / 5G",
      "bands2g": "GSM 850 / 900",
      "bands3g": "HSDPA 850 / 900",
      "bands4g": "LTE",
      "bands5g": "SA/NSA/Sub6",
      "speed": "5G"
    },
    "launch": {
      "announced": "2026, January",
      "status": "Coming soon"
    },
    "body": {
      "dimensions": "168 x 78 x 8.8 mm",
      "weight": "215 g",
      "build": "Glass Fiber Polymer",
      "sim": "Dual SIM",
      "resistance": "IP54"
    },
    "display": {
      "type": "PLS LCD, 120Hz",
      "size": "6.7 inches",
      "resolution": "720 x 1600",
      "protection": "Glass"
    },
    "platform": {
      "os": "Android 16",
      "chipset": "Dimensity 6300",
      "cpu": "Octa-core",
      "gpu": "Mali-G57"
    },
    "memory": {
      "cardSlot": "microSDXC",
      "internal": "128GB 6GB RAM"
    },
    "mainCamera": {
      "modules": "50 MP + 2 MP",
      "features": "LED flash",
      "video": "1080p@30fps"
    },
    "selfieCamera": {
      "modules": "8 MP",
      "features": "HDR",
      "video": "1080p@30fps"
    },
    "sound": {
      "loudspeaker": "Yes",
      "jack35mm": "Yes"
    },
    "comms": {
      "wlan": "Wi-Fi 5",
      "bluetooth": "5.3",
      "positioning": "GPS",
      "nfc": "No",
      "radio": "Yes",
      "usb": "USB Type-C 2.0"
    },
    "features": {
      "sensors": "Fingerprint (side-mounted)"
    },
    "battery": {
      "type": "6000 mAh",
      "charging": "25W wired"
    },
    "misc": {
      "colors": "Black, Green",
      "models": "SM-A076B",
      "price": "Rp 1.999.000"
    }
  }
},
  {
  "id": "samsung-galaxy-a06",
  "name": "Samsung Galaxy A06",
  "brand": "Samsung",
  "slug": "samsung-galaxy-a06",
  "releasedYear": 2024,
  "type": "Smartphone",
  "image": "https://images.pexels.com/photos/11216260/pexels-photo-11216260.jpeg?auto=compress&cs=tinysrgb&w=800",
  "youtubeUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "specs": {
    "network": {
      "technology": "GSM / HSPA / LTE",
      "bands2g": "GSM 850 / 900",
      "bands3g": "HSDPA 850 / 900",
      "bands4g": "LTE",
      "bands5g": "No",
      "speed": "LTE"
    },
    "launch": {
      "announced": "2024, August",
      "status": "Released"
    },
    "body": {
      "dimensions": "167.3 x 77.3 x 8.0 mm",
      "weight": "189 g",
      "build": "Plastic back",
      "sim": "Dual SIM",
      "resistance": "No"
    },
    "display": {
      "type": "PLS LCD, 60Hz",
      "size": "6.7 inches",
      "resolution": "720 x 1600",
      "protection": "Glass"
    },
    "platform": {
      "os": "Android 14",
      "chipset": "Helio G85",
      "cpu": "Octa-core",
      "gpu": "Mali-G52"
    },
    "memory": {
      "cardSlot": "microSDXC",
      "internal": "64GB 4GB RAM, 128GB 6GB RAM"
    },
    "mainCamera": {
      "modules": "50 MP + 2 MP",
      "features": "LED flash",
      "video": "1080p@30fps"
    },
    "selfieCamera": {
      "modules": "8 MP",
      "features": "HDR",
      "video": "1080p@30fps"
    },
    "sound": {
      "loudspeaker": "Yes",
      "jack35mm": "Yes"
    },
    "comms": {
      "wlan": "Wi-Fi 5",
      "bluetooth": "5.3",
      "positioning": "GPS",
      "nfc": "No",
      "radio": "Yes",
      "usb": "USB Type-C 2.0"
    },
    "features": {
      "sensors": "Fingerprint (side-mounted)"
    },
    "battery": {
      "type": "5000 mAh",
      "charging": "25W wired"
    },
    "misc": {
      "colors": "Black, Blue",
      "models": "SM-A065B",
      "price": "Rp 1.499.000"
    }
  }
},
  {
  "id": "samsung-galaxy-a55-5g",
  "name": "Samsung Galaxy A55 5G",
  "brand": "Samsung",
  "slug": "samsung-galaxy-a55-5g",
  "releasedYear": 2024,
  "type": "Smartphone",
  "image": "https://images.pexels.com/photos/11216260/pexels-photo-11216260.jpeg?auto=compress&cs=tinysrgb&w=800",
  "youtubeUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "specs": {
    "network": {
      "technology": "GSM / HSPA / LTE / 5G",
      "bands2g": "GSM 850 / 900",
      "bands3g": "HSDPA 850 / 900",
      "bands4g": "LTE",
      "bands5g": "SA/NSA/Sub6",
      "speed": "5G"
    },
    "launch": {
      "announced": "2024, March",
      "status": "Released"
    },
    "body": {
      "dimensions": "161.1 x 77.4 x 8.2 mm",
      "weight": "213 g",
      "build": "Glass front, glass back",
      "sim": "Dual SIM + eSIM",
      "resistance": "IP67"
    },
    "display": {
      "type": "Super AMOLED, 120Hz",
      "size": "6.6 inches",
      "resolution": "1080 x 2340",
      "protection": "Gorilla Glass Victus+"
    },
    "platform": {
      "os": "Android 14",
      "chipset": "Exynos 1480",
      "cpu": "Octa-core",
      "gpu": "Xclipse 530"
    },
    "memory": {
      "cardSlot": "microSDXC",
      "internal": "128GB 8GB RAM, 256GB 12GB RAM"
    },
    "mainCamera": {
      "modules": "50 MP + 12 MP + 5 MP",
      "features": "LED flash, HDR",
      "video": "4K@30fps"
    },
    "selfieCamera": {
      "modules": "32 MP",
      "features": "HDR",
      "video": "4K@30fps"
    },
    "sound": {
      "loudspeaker": "Yes",
      "jack35mm": "No"
    },
    "comms": {
      "wlan": "Wi-Fi 6",
      "bluetooth": "5.3",
      "positioning": "GPS",
      "nfc": "Yes",
      "radio": "No",
      "usb": "USB Type-C 2.0"
    },
    "features": {
      "sensors": "Fingerprint (optical)"
    },
    "battery": {
      "type": "5000 mAh",
      "charging": "25W wired"
    },
    "misc": {
      "colors": "Awesome Iceblue",
      "models": "SM-A556B",
      "price": "Rp 5.999.000"
    }
  }
},
  {
  "id": "samsung-galaxy-a35-5g",
  "name": "Samsung Galaxy A35 5G",
  "brand": "Samsung",
  "slug": "samsung-galaxy-a35-5g",
  "releasedYear": 2024,
  "type": "Smartphone",
  "image": "https://images.pexels.com/photos/11216260/pexels-photo-11216260.jpeg?auto=compress&cs=tinysrgb&w=800",
  "youtubeUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "specs": {
    "network": {
      "technology": "GSM / HSPA / LTE / 5G",
      "bands2g": "GSM 850 / 900",
      "bands3g": "HSDPA 850 / 900",
      "bands4g": "LTE",
      "bands5g": "SA/NSA/Sub6",
      "speed": "5G"
    },
    "launch": {
      "announced": "2024, March",
      "status": "Released"
    },
    "body": {
      "dimensions": "161.7 x 78 x 8.2 mm",
      "weight": "209 g",
      "build": "Glass back",
      "sim": "Dual SIM + eSIM",
      "resistance": "IP67"
    },
    "display": {
      "type": "Super AMOLED, 120Hz",
      "size": "6.6 inches",
      "resolution": "1080 x 2340",
      "protection": "Glass"
    },
    "platform": {
      "os": "Android 14",
      "chipset": "Exynos 1380",
      "cpu": "Octa-core",
      "gpu": "Mali-G68"
    },
    "memory": {
      "cardSlot": "microSDXC",
      "internal": "128GB 8GB RAM, 256GB 8GB RAM"
    },
    "mainCamera": {
      "modules": "50 MP + 8 MP + 5 MP",
      "features": "LED flash, HDR",
      "video": "4K@30fps"
    },
    "selfieCamera": {
      "modules": "13 MP",
      "features": "HDR",
      "video": "4K@30fps"
    },
    "sound": {
      "loudspeaker": "Yes",
      "jack35mm": "No"
    },
    "comms": {
      "wlan": "Wi-Fi 6",
      "bluetooth": "5.3",
      "positioning": "GPS",
      "nfc": "Yes",
      "radio": "No",
      "usb": "USB Type-C 2.0"
    },
    "features": {
      "sensors": "Fingerprint (optical)"
    },
    "battery": {
      "type": "5000 mAh",
      "charging": "25W wired"
    },
    "misc": {
      "colors": "Awesome Navy",
      "models": "SM-A356B",
      "price": "Rp 4.999.000"
    }
  }
},
  {
  "id": "samsung-galaxy-a25-5g",
  "name": "Samsung Galaxy A25 5G",
  "brand": "Samsung",
  "slug": "samsung-galaxy-a25-5g",
  "releasedYear": 2024,
  "type": "Smartphone",
  "image": "https://images.pexels.com/photos/11216260/pexels-photo-11216260.jpeg?auto=compress&cs=tinysrgb&w=800",
  "youtubeUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "specs": {
    "network": {
      "technology": "GSM / HSPA / LTE / 5G",
      "bands2g": "GSM 850 / 900",
      "bands3g": "HSDPA 850 / 900",
      "bands4g": "LTE",
      "bands5g": "SA/NSA/Sub6",
      "speed": "5G"
    },
    "launch": {
      "announced": "2023, December",
      "status": "Released"
    },
    "body": {
      "dimensions": "161 x 76.5 x 8.3 mm",
      "weight": "197 g",
      "build": "Plastic back",
      "sim": "Dual SIM",
      "resistance": "No"
    },
    "display": {
      "type": "Super AMOLED, 120Hz",
      "size": "6.5 inches",
      "resolution": "1080 x 2340",
      "protection": "Gorilla Glass 5"
    },
    "platform": {
      "os": "Android 14",
      "chipset": "Exynos 1280",
      "cpu": "Octa-core",
      "gpu": "Mali-G68"
    },
    "memory": {
      "cardSlot": "microSDXC",
      "internal": "128GB 8GB RAM, 256GB 8GB RAM"
    },
    "mainCamera": {
      "modules": "50 MP + 8 MP + 2 MP",
      "features": "LED flash, HDR",
      "video": "4K@30fps"
    },
    "selfieCamera": {
      "modules": "13 MP",
      "features": "HDR",
      "video": "1080p@30fps"
    },
    "sound": {
      "loudspeaker": "Yes",
      "jack35mm": "Yes"
    },
    "comms": {
      "wlan": "Wi-Fi 5",
      "bluetooth": "5.3",
      "positioning": "GPS",
      "nfc": "Yes",
      "radio": "No",
      "usb": "USB Type-C 2.0"
    },
    "features": {
      "sensors": "Fingerprint (side-mounted)"
    },
    "battery": {
      "type": "5000 mAh",
      "charging": "25W wired"
    },
    "misc": {
      "colors": "Black",
      "models": "SM-A256B",
      "price": "Rp 3.999.000"
    }
  }
},
  {
  "id": "samsung-galaxy-m35-5g",
  "name": "Samsung Galaxy M35 5G",
  "brand": "Samsung",
  "slug": "samsung-galaxy-m35-5g",
  "releasedYear": 2024,
  "type": "Smartphone",
  "image": "https://images.pexels.com/photos/11216260/pexels-photo-11216260.jpeg?auto=compress&cs=tinysrgb&w=800",
  "youtubeUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "specs": {
    "network": {
      "technology": "GSM / HSPA / LTE / 5G",
      "bands2g": "GSM 850 / 900",
      "bands3g": "HSDPA 850 / 900",
      "bands4g": "LTE",
      "bands5g": "SA/NSA/Sub6",
      "speed": "5G"
    },
    "launch": {
      "announced": "2024, May",
      "status": "Released"
    },
    "body": {
      "dimensions": "162.3 x 78.6 x 9.1 mm",
      "weight": "222 g",
      "build": "Plastic back",
      "sim": "Dual SIM",
      "resistance": "No"
    },
    "display": {
      "type": "Super AMOLED, 120Hz",
      "size": "6.6 inches",
      "resolution": "1080 x 2340",
      "protection": "Glass"
    },
    "platform": {
      "os": "Android 14",
      "chipset": "Exynos 1380",
      "cpu": "Octa-core",
      "gpu": "Mali-G68"
    },
    "memory": {
      "cardSlot": "microSDXC",
      "internal": "128GB 8GB RAM, 256GB 8GB RAM"
    },
    "mainCamera": {
      "modules": "50 MP + 8 MP + 5 MP",
      "features": "LED flash, HDR",
      "video": "4K@30fps"
    },
    "selfieCamera": {
      "modules": "13 MP",
      "features": "HDR",
      "video": "4K@30fps"
    },
    "sound": {
      "loudspeaker": "Yes",
      "jack35mm": "No"
    },
    "comms": {
      "wlan": "Wi-Fi 6",
      "bluetooth": "5.3",
      "positioning": "GPS",
      "nfc": "Yes",
      "radio": "No",
      "usb": "USB Type-C 2.0"
    },
    "features": {
      "sensors": "Fingerprint (side-mounted)"
    },
    "battery": {
      "type": "6000 mAh",
      "charging": "25W wired"
    },
    "misc": {
      "colors": "Dark Blue",
      "models": "SM-M356B",
      "price": "Rp 3.999.000"
    }
  }
},
  {
  "id": "samsung-galaxy-m34-5g",
  "name": "Samsung Galaxy M34 5G",
  "brand": "Samsung",
  "slug": "samsung-galaxy-m34-5g",
  "releasedYear": 2024,
  "type": "Smartphone",
  "image": "https://images.pexels.com/photos/11216260/pexels-photo-11216260.jpeg?auto=compress&cs=tinysrgb&w=800",
  "youtubeUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "specs": {
    "network": {
      "technology": "GSM / HSPA / LTE / 5G",
      "bands2g": "GSM 850 / 900",
      "bands3g": "HSDPA 850 / 900",
      "bands4g": "LTE",
      "bands5g": "SA/NSA/Sub6",
      "speed": "5G"
    },
    "launch": {
      "announced": "2023, July",
      "status": "Released"
    },
    "body": {
      "dimensions": "161.7 x 77.2 x 8.8 mm",
      "weight": "208 g",
      "build": "Plastic back",
      "sim": "Dual SIM",
      "resistance": "No"
    },
    "display": {
      "type": "Super AMOLED, 120Hz",
      "size": "6.5 inches",
      "resolution": "1080 x 2340",
      "protection": "Gorilla Glass 5"
    },
    "platform": {
      "os": "Android 13",
      "chipset": "Exynos 1280",
      "cpu": "Octa-core",
      "gpu": "Mali-G68"
    },
    "memory": {
      "cardSlot": "microSDXC",
      "internal": "128GB 8GB RAM"
    },
    "mainCamera": {
      "modules": "50 MP + 8 MP + 2 MP",
      "features": "LED flash, HDR",
      "video": "4K@30fps"
    },
    "selfieCamera": {
      "modules": "13 MP",
      "features": "HDR",
      "video": "1080p@30fps"
    },
    "sound": {
      "loudspeaker": "Yes",
      "jack35mm": "Yes"
    },
    "comms": {
      "wlan": "Wi-Fi 5",
      "bluetooth": "5.3",
      "positioning": "GPS",
      "nfc": "Yes",
      "radio": "No",
      "usb": "USB Type-C 2.0"
    },
    "features": {
      "sensors": "Fingerprint (side-mounted)"
    },
    "battery": {
      "type": "6000 mAh",
      "charging": "25W wired"
    },
    "misc": {
      "colors": "Midnight Blue",
      "models": "SM-M346B",
      "price": "Rp 3.499.000"
    }
  }
},
  {
  "id": "samsung-galaxy-m15-5g",
  "name": "Samsung Galaxy M15 5G",
  "brand": "Samsung",
  "slug": "samsung-galaxy-m15-5g",
  "releasedYear": 2024,
  "type": "Smartphone",
  "image": "https://images.pexels.com/photos/11216260/pexels-photo-11216260.jpeg?auto=compress&cs=tinysrgb&w=800",
  "youtubeUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "specs": {
    "network": {
      "technology": "GSM / HSPA / LTE / 5G",
      "bands2g": "GSM 850 / 900",
      "bands3g": "HSDPA 850 / 900",
      "bands4g": "LTE",
      "bands5g": "SA/NSA/Sub6",
      "speed": "5G"
    },
    "launch": {
      "announced": "2024, March",
      "status": "Released"
    },
    "body": {
      "dimensions": "160.1 x 76.8 x 9.3 mm",
      "weight": "217 g",
      "build": "Plastic back",
      "sim": "Dual SIM",
      "resistance": "No"
    },
    "display": {
      "type": "Super AMOLED, 90Hz",
      "size": "6.5 inches",
      "resolution": "1080 x 2340",
      "protection": "Glass"
    },
    "platform": {
      "os": "Android 14",
      "chipset": "Dimensity 6100+",
      "cpu": "Octa-core",
      "gpu": "Mali-G57"
    },
    "memory": {
      "cardSlot": "microSDXC",
      "internal": "128GB 6GB RAM"
    },
    "mainCamera": {
      "modules": "50 MP + 5 MP + 2 MP",
      "features": "LED flash, HDR",
      "video": "1080p@30fps"
    },
    "selfieCamera": {
      "modules": "13 MP",
      "features": "HDR",
      "video": "1080p@30fps"
    },
    "sound": {
      "loudspeaker": "Yes",
      "jack35mm": "Yes"
    },
    "comms": {
      "wlan": "Wi-Fi 5",
      "bluetooth": "5.3",
      "positioning": "GPS",
      "nfc": "Yes",
      "radio": "No",
      "usb": "USB Type-C 2.0"
    },
    "features": {
      "sensors": "Fingerprint (side-mounted)"
    },
    "battery": {
      "type": "6000 mAh",
      "charging": "25W wired"
    },
    "misc": {
      "colors": "Dark Blue",
      "models": "SM-M156B",
      "price": "Rp 2.499.000"
    }
  }
},
  {
  "id": "samsung-galaxy-m54-5g",
  "name": "Samsung Galaxy M54 5G",
  "brand": "Samsung",
  "slug": "samsung-galaxy-m54-5g",
  "releasedYear": 2023,
  "type": "Smartphone",
  "image": "https://images.pexels.com/photos/11216260/pexels-photo-11216260.jpeg?auto=compress&cs=tinysrgb&w=800",
  "youtubeUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "specs": {
    "network": {
      "technology": "GSM / HSPA / LTE / 5G",
      "bands2g": "GSM 850 / 900",
      "bands3g": "HSDPA 850 / 900",
      "bands4g": "LTE",
      "bands5g": "SA/NSA/Sub6",
      "speed": "5G"
    },
    "launch": {
      "announced": "2023, March",
      "status": "Released"
    },
    "body": {
      "dimensions": "164.9 x 77.3 x 8.4 mm",
      "weight": "199 g",
      "build": "Plastic back",
      "sim": "Dual SIM",
      "resistance": "No"
    },
    "display": {
      "type": "Super AMOLED, 120Hz",
      "size": "6.7 inches",
      "resolution": "1080 x 2400",
      "protection": "Gorilla Glass 5"
    },
    "platform": {
      "os": "Android 13",
      "chipset": "Exynos 1380",
      "cpu": "Octa-core",
      "gpu": "Mali-G68"
    },
    "memory": {
      "cardSlot": "microSDXC",
      "internal": "256GB 8GB RAM"
    },
    "mainCamera": {
      "modules": "108 MP + 8 MP + 2 MP",
      "features": "LED flash, HDR",
      "video": "4K@30fps"
    },
    "selfieCamera": {
      "modules": "32 MP",
      "features": "HDR",
      "video": "4K@30fps"
    },
    "sound": {
      "loudspeaker": "Yes",
      "jack35mm": "No"
    },
    "comms": {
      "wlan": "Wi-Fi 6",
      "bluetooth": "5.3",
      "positioning": "GPS",
      "nfc": "Yes",
      "radio": "No",
      "usb": "USB Type-C 2.0"
    },
    "features": {
      "sensors": "Fingerprint (side-mounted)"
    },
    "battery": {
      "type": "6000 mAh",
      "charging": "25W wired"
    },
    "misc": {
      "colors": "Silver",
      "models": "SM-M546B",
      "price": "Rp 6.499.000"
    }
  }
},

  {
  "id": "samsung-galaxy-s25-ultra",
  "name": "Samsung Galaxy S25 Ultra",
  "brand": "Samsung",
  "slug": "samsung-galaxy-s25-ultra",
  "releasedYear": 2025,
  "type": "Smartphone",
  "image": "https://images.pexels.com/photos/11216260/pexels-photo-11216260.jpeg?auto=compress&cs=tinysrgb&w=800",
  "youtubeUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "specs": {
    "network": {
      "technology": "GSM / CDMA / HSPA / EVDO / LTE / 5G",
      "bands2g": "GSM 850 / 900",
      "bands3g": "HSDPA 850 / 900 / 1700(AWS) / 1900 / 2100",
      "bands4g": "LTE",
      "bands5g": "SA/NSA/Sub6",
      "speed": "HSPA, LTE-A, 5G"
    },
    "launch": {
      "announced": "2025, January",
      "status": "Released 2025, February"
    },
    "body": {
      "dimensions": "162.8 x 77.6 x 8.2 mm",
      "weight": "219 g",
      "build": "Gorilla Armor 2, titanium frame",
      "sim": "Dual SIM Nano + eSIM",
      "resistance": "IP68 dust/water resistant, S Pen"
    },
    "display": {
      "type": "Dynamic LTPO AMOLED 2X, 120Hz, 2600 nits",
      "size": "6.9 inches",
      "resolution": "3120 x 1440 pixels",
      "protection": "Corning Gorilla Armor 2",
      "features": "Anti-reflective"
    },
    "platform": {
      "os": "Android 15, One UI 7.1",
      "chipset": "Snapdragon 8 Elite for Galaxy",
      "cpu": "Octa-core",
      "gpu": "Adreno 830"
    },
    "memory": {
      "cardSlot": "No",
      "internal": "256GB 12GB RAM, 512GB 16GB RAM, 1TB 16GB RAM"
    },
    "mainCamera": {
      "modules": "200 MP + 50 MP periscope + 10 MP telephoto + 50 MP ultrawide",
      "features": "LED flash, auto-HDR",
      "video": "8K@30fps, 4K@30/60/120fps"
    },
    "selfieCamera": {
      "modules": "12 MP",
      "features": "Dual video call, Auto-HDR",
      "video": "4K@30/60fps"
    },
    "sound": {
      "loudspeaker": "Yes, stereo speakers",
      "jack35mm": "No"
    },
    "comms": {
      "wlan": "Wi-Fi 802.11 a/b/g/n/ac/6e/7",
      "bluetooth": "5.4",
      "positioning": "GPS, GLONASS, BDS, GALILEO",
      "nfc": "Yes",
      "radio": "No",
      "usb": "USB Type-C 3.2"
    },
    "features": {
      "sensors": "Fingerprint (under display, ultrasonic), UWB, Samsung DeX"
    },
    "battery": {
      "type": "5000 mAh",
      "charging": "45W wired, 15W wireless"
    },
    "misc": {
      "colors": "Titanium Black, Gray, Violet",
      "models": "SM-S938B",
      "price": "Rp 21.999.000"
    }
  }
},
  {
  "id": "samsung-galaxy-s25-plus",
  "name": "Samsung Galaxy S25+",
  "brand": "Samsung",
  "slug": "samsung-galaxy-s25-plus",
  "releasedYear": 2025,
  "type": "Smartphone",
  "image": "https://images.pexels.com/photos/11216260/pexels-photo-11216260.jpeg?auto=compress&cs=tinysrgb&w=800",
  "youtubeUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "specs": {
    "network": {
      "technology": "GSM / HSPA / LTE / 5G",
      "bands2g": "GSM 850 / 900",
      "bands3g": "HSDPA 850 / 900",
      "bands4g": "LTE",
      "bands5g": "SA/NSA/Sub6",
      "speed": "5G"
    },
    "launch": {
      "announced": "2025, January",
      "status": "Released 2025, February"
    },
    "body": {
      "dimensions": "158.5 x 75.9 x 7.7 mm",
      "weight": "195 g",
      "build": "Armor Aluminum 2",
      "sim": "Nano-SIM + eSIM",
      "resistance": "IP68"
    },
    "display": {
      "type": "Dynamic LTPO AMOLED 2X, 120Hz, 2600 nits",
      "size": "6.7 inches",
      "resolution": "3120 x 1440 pixels",
      "protection": "Gorilla Glass Victus 2"
    },
    "platform": {
      "os": "Android 15",
      "chipset": "Snapdragon 8 Elite",
      "cpu": "Octa-core",
      "gpu": "Adreno 830"
    },
    "memory": {
      "cardSlot": "No",
      "internal": "256GB 12GB RAM, 512GB 12GB RAM"
    },
    "mainCamera": {
      "modules": "50 MP + 10 MP + 12 MP",
      "features": "LED flash, HDR",
      "video": "8K@30fps"
    },
    "selfieCamera": {
      "modules": "12 MP",
      "features": "HDR",
      "video": "4K@60fps"
    },
    "sound": {
      "loudspeaker": "Yes",
      "jack35mm": "No"
    },
    "comms": {
      "wlan": "Wi-Fi 7",
      "bluetooth": "5.4",
      "positioning": "GPS",
      "nfc": "Yes",
      "radio": "No",
      "usb": "USB Type-C 3.2"
    },
    "features": {
      "sensors": "Fingerprint (ultrasonic)"
    },
    "battery": {
      "type": "4900 mAh",
      "charging": "45W wired"
    },
    "misc": {
      "colors": "Phantom Black, Cream",
      "models": "SM-S936B",
      "price": "Rp 16.999.000"
    }
  }
},
  {
  "id": "samsung-galaxy-s25",
  "name": "Samsung Galaxy S25",
  "brand": "Samsung",
  "slug": "samsung-galaxy-s25",
  "releasedYear": 2025,
  "type": "Smartphone",
  "image": "https://images.pexels.com/photos/11216260/pexels-photo-11216260.jpeg?auto=compress&cs=tinysrgb&w=800",
  "youtubeUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "specs": {
    "network": {
      "technology": "GSM / HSPA / LTE / 5G",
      "bands2g": "GSM 850 / 900",
      "bands3g": "HSDPA 850 / 900",
      "bands4g": "LTE",
      "bands5g": "SA/NSA/Sub6",
      "speed": "5G"
    },
    "launch": {
      "announced": "2025, January",
      "status": "Released 2025, February"
    },
    "body": {
      "dimensions": "146.9 x 70.4 x 7.2 mm",
      "weight": "167 g",
      "build": "Armor Aluminum",
      "sim": "Dual SIM + eSIM",
      "resistance": "IP68"
    },
    "display": {
      "type": "Dynamic AMOLED 2X, 120Hz",
      "size": "6.2 inches",
      "resolution": "2340 x 1080 pixels",
      "protection": "Gorilla Glass Victus 2"
    },
    "platform": {
      "os": "Android 15",
      "chipset": "Snapdragon 8 Elite",
      "cpu": "Octa-core",
      "gpu": "Adreno 830"
    },
    "memory": {
      "cardSlot": "No",
      "internal": "128GB 12GB RAM, 256GB 12GB RAM"
    },
    "mainCamera": {
      "modules": "50 MP + 10 MP + 12 MP",
      "features": "LED flash, HDR",
      "video": "8K@30fps"
    },
    "selfieCamera": {
      "modules": "12 MP",
      "features": "HDR",
      "video": "4K@60fps"
    },
    "sound": {
      "loudspeaker": "Yes",
      "jack35mm": "No"
    },
    "comms": {
      "wlan": "Wi-Fi 7",
      "bluetooth": "5.4",
      "positioning": "GPS",
      "nfc": "Yes",
      "radio": "No",
      "usb": "USB Type-C 3.2"
    },
    "features": {
      "sensors": "Fingerprint (optical)"
    },
    "battery": {
      "type": "4000 mAh",
      "charging": "25W wired"
    },
    "misc": {
      "colors": "Phantom Black, Cream",
      "models": "SM-S931B",
      "price": "Rp 13.999.000"
    }
  }
},
  {
  "id": "samsung-galaxy-z-fold-6",
  "name": "Samsung Galaxy Z Fold 6",
  "brand": "Samsung",
  "slug": "samsung-galaxy-z-fold-6",
  "releasedYear": 2024,
  "type": "Smartphone",
  "image": "https://images.pexels.com/photos/11216260/pexels-photo-11216260.jpeg?auto=compress&cs=tinysrgb&w=800",
  "youtubeUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "specs": {
    "network": {
      "technology": "GSM / HSPA / LTE / 5G",
      "bands2g": "GSM 850 / 900",
      "bands3g": "HSDPA 850 / 900",
      "bands4g": "LTE",
      "bands5g": "SA/NSA/Sub6",
      "speed": "5G"
    },
    "launch": {
      "announced": "2024, July",
      "status": "Released 2024"
    },
    "body": {
      "dimensions": "153.5 x 132.6 x 5.6 mm",
      "weight": "239 g",
      "build": "Armor Aluminum frame",
      "sim": "Nano-SIM + eSIM",
      "resistance": "IP48"
    },
    "display": {
      "type": "Foldable Dynamic LTPO AMOLED 2X",
      "size": "7.6 inches",
      "resolution": "1856 x 2160 pixels",
      "protection": "Plastic front"
    },
    "platform": {
      "os": "Android 14",
      "chipset": "Snapdragon 8 Gen 3 for Galaxy",
      "cpu": "Octa-core",
      "gpu": "Adreno 750"
    },
    "memory": {
      "cardSlot": "No",
      "internal": "256GB 12GB RAM, 512GB 12GB RAM, 1TB 12GB RAM"
    },
    "mainCamera": {
      "modules": "50 MP + 10 MP + 12 MP",
      "features": "LED flash, HDR",
      "video": "8K@30fps"
    },
    "selfieCamera": {
      "modules": "4 MP (under display) + 10 MP (cover)",
      "features": "HDR",
      "video": "4K@60fps"
    },
    "sound": {
      "loudspeaker": "Yes",
      "jack35mm": "No"
    },
    "comms": {
      "wlan": "Wi-Fi 6e",
      "bluetooth": "5.3",
      "positioning": "GPS",
      "nfc": "Yes",
      "radio": "No",
      "usb": "USB Type-C 3.2"
    },
    "features": {
      "sensors": "Fingerprint (side-mounted)"
    },
    "battery": {
      "type": "4400 mAh",
      "charging": "25W wired"
    },
    "misc": {
      "colors": "Silver Shadow, Pink, Navy",
      "models": "SM-F956B",
      "price": "Rp 26.499.000"
    }
  }
},
  {
  "id": "samsung-galaxy-z-flip-6",
  "name": "Samsung Galaxy Z Flip 6",
  "brand": "Samsung",
  "slug": "samsung-galaxy-z-flip-6",
  "releasedYear": 2024,
  "type": "Smartphone",
  "image": "https://images.pexels.com/photos/11216260/pexels-photo-11216260.jpeg?auto=compress&cs=tinysrgb&w=800",
  "youtubeUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "specs": {
    "network": {
      "technology": "GSM / HSPA / LTE / 5G",
      "bands2g": "GSM 850 / 900",
      "bands3g": "HSDPA 850 / 900",
      "bands4g": "LTE",
      "bands5g": "SA/NSA/Sub6",
      "speed": "5G"
    },
    "launch": {
      "announced": "2024, July",
      "status": "Released 2024"
    },
    "body": {
      "dimensions": "165.1 x 71.9 x 6.9 mm",
      "weight": "187 g",
      "build": "Armor Aluminum frame",
      "sim": "Nano-SIM + eSIM",
      "resistance": "IP48"
    },
    "display": {
      "type": "Foldable Dynamic LTPO AMOLED 2X",
      "size": "6.7 inches",
      "resolution": "1080 x 2640 pixels",
      "protection": "Plastic front"
    },
    "platform": {
      "os": "Android 14",
      "chipset": "Snapdragon 8 Gen 3 for Galaxy",
      "cpu": "Octa-core",
      "gpu": "Adreno 750"
    },
    "memory": {
      "cardSlot": "No",
      "internal": "256GB 12GB RAM, 512GB 12GB RAM"
    },
    "mainCamera": {
      "modules": "50 MP + 12 MP",
      "features": "LED flash, HDR",
      "video": "4K@60fps"
    },
    "selfieCamera": {
      "modules": "10 MP",
      "features": "HDR",
      "video": "4K@30fps"
    },
    "sound": {
      "loudspeaker": "Yes",
      "jack35mm": "No"
    },
    "comms": {
      "wlan": "Wi-Fi 6e",
      "bluetooth": "5.3",
      "positioning": "GPS",
      "nfc": "Yes",
      "radio": "No",
      "usb": "USB Type-C 3.2"
    },
    "features": {
      "sensors": "Fingerprint (side-mounted)"
    },
    "battery": {
      "type": "4000 mAh",
      "charging": "25W wired"
    },
    "misc": {
      "colors": "Blue, Yellow, Mint",
      "models": "SM-F741B",
      "price": "Rp 17.499.000"
    }
  }
},
  {
  "id": "samsung-galaxy-a56-5g",
  "name": "Samsung Galaxy A56 5G",
  "brand": "Samsung",
  "slug": "samsung-galaxy-a56-5g",
  "releasedYear": 2025,
  "type": "Smartphone",
  "image": "https://images.pexels.com/photos/11216260/pexels-photo-11216260.jpeg?auto=compress&cs=tinysrgb&w=800",
  "youtubeUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "specs": {
    "network": {
      "technology": "GSM / HSPA / LTE / 5G",
      "bands2g": "GSM 850 / 900",
      "bands3g": "HSDPA 850 / 900",
      "bands4g": "LTE",
      "bands5g": "SA/NSA/Sub6",
      "speed": "5G"
    },
    "launch": {
      "announced": "2025, March",
      "status": "Coming soon"
    },
    "body": {
      "dimensions": "161.1 x 77.4 x 8.2 mm",
      "weight": "213 g",
      "build": "Glass front, aluminum frame",
      "sim": "Dual SIM",
      "resistance": "IP67"
    },
    "display": {
      "type": "Super AMOLED, 120Hz",
      "size": "6.7 inches",
      "resolution": "1080 x 2400 pixels",
      "protection": "Gorilla Glass Victus+"
    },
    "platform": {
      "os": "Android 15",
      "chipset": "Exynos 1580",
      "cpu": "Octa-core",
      "gpu": "Xclipse 540"
    },
    "memory": {
      "cardSlot": "microSDXC",
      "internal": "128GB 8GB RAM, 256GB 8GB RAM"
    },
    "mainCamera": {
      "modules": "50 MP + 12 MP + 5 MP",
      "features": "LED flash, HDR",
      "video": "4K@30fps"
    },
    "selfieCamera": {
      "modules": "12 MP",
      "features": "HDR",
      "video": "4K@30fps"
    },
    "sound": {
      "loudspeaker": "Yes",
      "jack35mm": "No"
    },
    "comms": {
      "wlan": "Wi-Fi 6",
      "bluetooth": "5.3",
      "positioning": "GPS",
      "nfc": "Yes",
      "radio": "No",
      "usb": "USB Type-C 2.0"
    },
    "features": {
      "sensors": "Fingerprint (optical)"
    },
    "battery": {
      "type": "5000 mAh",
      "charging": "45W wired"
    },
    "misc": {
      "colors": "Awesome Iceblue, Awesome Lilac",
      "models": "SM-A566B",
      "price": "Rp 6.499.000"
    }
  }
},
  {
  "id": "samsung-galaxy-a36-5g",
  "name": "Samsung Galaxy A36 5G",
  "brand": "Samsung",
  "slug": "samsung-galaxy-a36-5g",
  "releasedYear": 2025,
  "type": "Smartphone",
  "image": "https://images.pexels.com/photos/11216260/pexels-photo-11216260.jpeg?auto=compress&cs=tinysrgb&w=800",
  "youtubeUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "specs": {
    "network": {
      "technology": "GSM / HSPA / LTE / 5G",
      "bands2g": "GSM 850 / 900",
      "bands3g": "HSDPA 850 / 900",
      "bands4g": "LTE",
      "bands5g": "SA/NSA/Sub6",
      "speed": "5G"
    },
    "launch": {
      "announced": "2025, March",
      "status": "Coming soon"
    },
    "body": {
      "dimensions": "161.7 x 78.0 x 8.2 mm",
      "weight": "209 g",
      "build": "Glass front, plastic frame",
      "sim": "Dual SIM",
      "resistance": "IP67"
    },
    "display": {
      "type": "Super AMOLED, 120Hz",
      "size": "6.7 inches",
      "resolution": "1080 x 2400 pixels",
      "protection": "Gorilla Glass Victus+"
    },
    "platform": {
      "os": "Android 15",
      "chipset": "Snapdragon 6 Gen 3",
      "cpu": "Octa-core",
      "gpu": "Adreno"
    },
    "memory": {
      "cardSlot": "microSDXC",
      "internal": "128GB 6GB RAM, 256GB 8GB RAM"
    },
    "mainCamera": {
      "modules": "50 MP + 8 MP + 5 MP",
      "features": "LED flash, HDR",
      "video": "4K@30fps"
    },
    "selfieCamera": {
      "modules": "12 MP",
      "features": "HDR",
      "video": "4K@30fps"
    },
    "sound": {
      "loudspeaker": "Yes",
      "jack35mm": "No"
    },
    "comms": {
      "wlan": "Wi-Fi 6",
      "bluetooth": "5.3",
      "positioning": "GPS",
      "nfc": "Yes",
      "radio": "No",
      "usb": "USB Type-C 2.0"
    },
    "features": {
      "sensors": "Fingerprint (optical)"
    },
    "battery": {
      "type": "5000 mAh",
      "charging": "45W wired"
    },
    "misc": {
      "colors": "Awesome Iceblue",
      "models": "SM-A366B",
      "price": "Rp 4.999.000"
    }
  }
},
  {
  "id": "samsung-galaxy-m55-5g",
  "name": "Samsung Galaxy M55 5G",
  "brand": "Samsung",
  "slug": "samsung-galaxy-m55-5g",
  "releasedYear": 2024,
  "type": "Smartphone",
  "image": "https://images.pexels.com/photos/11216260/pexels-photo-11216260.jpeg?auto=compress&cs=tinysrgb&w=800",
  "youtubeUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
  "specs": {
    "network": {
      "technology": "GSM / HSPA / LTE / 5G",
      "bands2g": "GSM 850 / 900",
      "bands3g": "HSDPA 850 / 900",
      "bands4g": "LTE",
      "bands5g": "SA/NSA/Sub6",
      "speed": "5G"
    },
    "launch": {
      "announced": "2024, March",
      "status": "Available"
    },
    "body": {
      "dimensions": "163.9 x 76.5 x 7.8 mm",
      "weight": "180 g",
      "build": "Plastic back, plastic frame",
      "sim": "Dual SIM",
      "resistance": "No"
    },
    "display": {
      "type": "Super AMOLED+, 120Hz",
      "size": "6.7 inches",
      "resolution": "1080 x 2400 pixels",
      "protection": "Gorilla Glass 5"
    },
    "platform": {
      "os": "Android 14",
      "chipset": "Snapdragon 7 Gen 1",
      "cpu": "Octa-core",
      "gpu": "Adreno 644"
    },
    "memory": {
      "cardSlot": "microSDXC",
      "internal": "256GB 8GB RAM"
    },
    "mainCamera": {
      "modules": "50 MP + 8 MP + 2 MP",
      "features": "LED flash, HDR",
      "video": "4K@30fps"
    },
    "selfieCamera": {
      "modules": "50 MP",
      "features": "HDR",
      "video": "4K@30fps"
    },
    "sound": {
      "loudspeaker": "Yes",
      "jack35mm": "No"
    },
    "comms": {
      "wlan": "Wi-Fi 6",
      "bluetooth": "5.2",
      "positioning": "GPS",
      "nfc": "Yes",
      "radio": "No",
      "usb": "USB Type-C 2.0"
    },
    "features": {
      "sensors": "Fingerprint (optical)"
    },
    "battery": {
      "type": "6000 mAh",
      "charging": "45W wired"
    },
    "misc": {
      "colors": "Dark Blue, Light Green",
      "models": "SM-M556B",
      "price": "Rp 5.499.000"
    }
  }
},

  {
    id: "samsung-galaxy-s26-ultra",
    name: "Samsung Galaxy S26 Ultra",
    brand: "Samsung",
    slug: "samsung-galaxy-s26-ultra",
    releasedYear: 2026,
    type: 'Smartphone',
    image: "https://images.pexels.com/photos/11216260/pexels-photo-11216260.jpeg?auto=compress&cs=tinysrgb&w=800",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    specs: {
      network: {
        technology: "GSM / CDMA / HSPA / EVDO / LTE / 5G / 6G Ready",
        bands2g: "GSM 850 / 900 / 1800 / 1900 - SIM 1 & SIM 2 (Dual-SIM model only)",
        bands3g: "HSDPA 850 / 900 / 1700(AWS) / 1900 / 2100",
        bands4g: "1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 32, 38, 39, 40, 41, 66",
        bands5g: "1, 2, 3, 5, 7, 8, 12, 20, 25, 28, 38, 40, 41, 66, 75, 77, 78 SA/NSA/Sub6",
        speed: "HSPA, LTE-A (up to 7CA), 5G (up to 15Gbps), 6G Ready"
      },
      launch: {
        announced: "2026, January 15",
        status: "Available. Released 2026, January 28"
      },
      body: {
        dimensions: "162.3 x 79.0 x 8.6 mm (6.39 x 3.11 x 0.34 in)",
        weight: "232 g (8.18 oz)",
        build: "Glass front (Gorilla Glass Armor 2), glass back (Gorilla Glass Armor 2), titanium frame (grade 5)",
        sim: "Nano-SIM and eSIM or Dual SIM (2 Nano-SIMs and eSIM, dual stand-by)",
        resistance: "IP68 dust/water resistant (up to 1.5m for 30 min), Stylus (Bluetooth integration, accelerometer, gyro)"
      },
      display: {
        type: "Dynamic AMOLED 2X, 144Hz, HDR10+, 3000 nits (peak)",
        size: "6.8 inches, 113.5 cm2 (~88.5% screen-to-body ratio)",
        resolution: "1440 x 3120 pixels, 19.5:9 ratio (~505 ppi density)",
        protection: "Corning Gorilla Glass Armor 2",
        features: "Always-on display"
      },
      platform: {
        os: "Android 16, One UI 8.0",
        chipset: "Qualcomm Snapdragon 8 Gen 5 (3 nm)",
        cpu: "Octa-core (1x3.5 GHz Cortex-X5 & 3x3.0 GHz Cortex-A730 & 4x2.3 GHz Cortex-A520)",
        gpu: "Adreno 850"
      },
      memory: {
        cardSlot: "No",
        internal: "256GB 12GB RAM, 512GB 16GB RAM, 1TB 16GB RAM (UFS 4.1)"
      },
      mainCamera: {
        modules: "400 MP, f/1.7, 24mm (wide), 1/0.98\", 0.7µm, multi-directional PDAF, Laser AF, OIS\n50 MP, f/3.4, 115mm (periscope telephoto), 0.7µm, PDAF, OIS, 5x optical zoom\n12 MP, f/2.4, 67mm (telephoto), 1.12µm, PDAF, OIS, 3x optical zoom\n12 MP, f/2.2, 13mm, 120˚ (ultrawide), 1.4µm, dual pixel PDAF, Super Steady video",
        features: "LED flash, auto-HDR, panorama",
        video: "8K@30/60fps, 4K@30/60/120fps, 1080p@30/60/240fps, 1080p@960fps, HDR10+, stereo sound rec., gyro-EIS"
      },
      selfieCamera: {
        modules: "40 MP, f/2.2, 26mm (wide), Dual Pixel PDAF",
        features: "Dual video call, Auto-HDR, HDR10+",
        video: "4K@30/60fps, 1080p@30fps"
      },
      sound: {
        loudspeaker: "Yes, with stereo speakers",
        jack35mm: "No"
      },
      comms: {
        wlan: "Wi-Fi 802.11 a/b/g/n/ac/6e/7/8, tri-band, Wi-Fi Direct",
        bluetooth: "5.4, A2DP, LE",
        positioning: "GPS, GLONASS, BDS, GALILEO, QZSS",
        nfc: "Yes",
        radio: "No",
        usb: "USB Type-C 3.2, OTG, DisplayPort 1.4"
      },
      features: {
        sensors: "Fingerprint (under display, ultrasonic), accelerometer, gyro, proximity, compass, barometer, Samsung DeX, Samsung Wireless DeX (desktop experience support), Ultra Wideband (UWB) support"
      },
      battery: {
        type: "Li-Ion 5500 mAh, non-removable",
        charging: "65W wired, PD3.0, 65% in 30 min (advertised), 15W wireless (Qi/PMA), 4.5W reverse wireless"
      },
      misc: {
        colors: "Titanium Black, Titanium Gray, Titanium Violet, Titanium Yellow",
        models: "SM-S948B, SM-S948B/DS, SM-S948U, SM-S948U1, SM-S948W, SM-S948N",
        price: "Rp 24.999.000 / $ 1,399.00 / £ 1,249.00 / € 1,449.00"
      }
    }
  },
  {
    id: "iphone-17-pro-max",
    name: "iPhone 17 Pro Max",
    brand: "Apple",
    slug: "iphone-17-pro-max",
    releasedYear: 2025,
    type: 'Smartphone',
    image: "https://images.pexels.com/photos/11216260/pexels-photo-11216260.jpeg?auto=compress&cs=tinysrgb&w=800",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    specs: {
      network: {
        technology: "GSM / CDMA / HSPA / EVDO / LTE / 5G",
        bands2g: "GSM 850 / 900 / 1800 / 1900",
        bands3g: "HSDPA 850 / 900 / 1700(AWS) / 1900 / 2100",
        bands4g: "1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 30, 32, 34, 38, 39, 40, 41, 42, 46, 48, 66",
        bands5g: "1, 2, 3, 5, 7, 8, 12, 20, 25, 26, 28, 30, 38, 40, 41, 48, 66, 70, 77, 78, 79 SA/NSA/Sub6",
        speed: "HSPA, LTE-A, 5G, EV-DO Rev.A 3.1 Mbps"
      },
      launch: {
        announced: "2025, September 09",
        status: "Available. Released 2025, September 22"
      },
      body: {
        dimensions: "163.0 x 77.6 x 8.3 mm (6.42 x 3.06 x 0.33 in)",
        weight: "225 g (7.94 oz)",
        build: "Glass front (Corning-made glass), glass back (Corning-made glass), titanium frame (grade 5)",
        sim: "Nano-SIM and eSIM - International, Dual eSIM with multiple numbers - USA, Dual SIM (Nano-SIM, dual stand-by) - China",
        resistance: "IP68 dust/water resistant (up to 6m for 30 min), Apple Pay (Visa, MasterCard, American Express certified)"
      },
      display: {
        type: "LTPO Super Retina XDR OLED, 120Hz, HDR10, Dolby Vision, 2500 nits (peak)",
        size: "6.9 inches, 115.0 cm2 (~90.5% screen-to-body ratio)",
        resolution: "1320 x 2868 pixels, 19.5:9 ratio (~460 ppi density)",
        protection: "Ceramic Shield glass (2025 gen)",
        features: "Always-On display"
      },
      platform: {
        os: "iOS 19, upgradable to iOS 19.4",
        chipset: "Apple A19 Pro (3 nm)",
        cpu: "Hexa-core (2x4.0 GHz + 4x2.4 GHz)",
        gpu: "Apple GPU (6-core graphics)"
      },
      memory: {
        cardSlot: "No",
        internal: "256GB 12GB RAM, 512GB 12GB RAM, 1TB 12GB RAM, 2TB 12GB RAM (NVMe)"
      },
      mainCamera: {
        modules: "48 MP, f/1.8, 24mm (wide), 1/1.28\", 1.22µm, dual pixel PDAF, sensor-shift OIS\n48 MP, f/2.8, 120mm (periscope telephoto), 1.12µm, dual pixel PDAF, 3D sensor-shift OIS, 5x optical zoom\n48 MP, f/2.2, 13mm, 120˚ (ultrawide), 0.7µm, PDAF\nTOF 3D LiDAR scanner (depth)",
        features: "Dual-LED dual-tone flash, HDR (photo/panorama)",
        video: "4K@24/25/30/60fps, 1080p@25/30/60/120/240fps, 10-bit HDR, Dolby Vision HDR (up to 60fps), ProRes, Cinematic mode (4K@30fps), 3D (spatial) video, stereo sound rec."
      },
      selfieCamera: {
        modules: "12 MP, f/1.9, 23mm (wide), 1/3.6\", PDAF, OIS",
        features: "HDR, Cinematic mode (4K@30fps)",
        video: "4K@24/25/30/60fps, 1080p@25/30/60/120fps, gyro-EIS"
      },
      sound: {
        loudspeaker: "Yes, with stereo speakers",
        jack35mm: "No"
      },
      comms: {
        wlan: "Wi-Fi 802.11 a/b/g/n/ac/6e/7, tri-band, hotspot",
        bluetooth: "5.4, A2DP, LE",
        positioning: "GPS (L1+L5), GLONASS, GALILEO, BDS, QZSS, NavIC",
        nfc: "Yes",
        radio: "No",
        usb: "USB Type-C 3.2 Gen 2, DisplayPort"
      },
      features: {
        sensors: "Face ID, accelerometer, gyro, proximity, compass, barometer, Ultra Wideband 2 (UWB) support, Emergency SOS via satellite (SMS sending/receiving)"
      },
      battery: {
        type: "Li-Ion 4852 mAh, non-removable",
        charging: "Wired, PD2.0, 50% in 30 min (advertised), 25W wireless (MagSafe), 15W wireless (Qi2), Reverse wired"
      },
      misc: {
        colors: "Black Titanium, White Titanium, Natural Titanium, Desert Titanium",
        models: "A3108, A3105, A3106, A2849",
        price: "Rp 26.499.000 / $ 1,199.00 / £ 1,199.00 / € 1,449.00"
      }
    }
  },
  {
    id: "ipad-pro-m4-13",
    name: "Apple iPad Pro 13 (2024)",
    brand: "Apple",
    slug: "apple-ipad-pro-13-2024-m4",
    releasedYear: 2024,
    type: 'Tablet',
    image: "https://images.pexels.com/photos/11216260/pexels-photo-11216260.jpeg?auto=compress&cs=tinysrgb&w=800",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    specs: {
      network: {
        technology: "GSM / HSPA / LTE / 5G",
        bands2g: "GSM 850 / 900 / 1800 / 1900",
        bands3g: "HSDPA 850 / 900 / 1700(AWS) / 1900 / 2100",
        bands4g: "1, 2, 3, 4, 5, 7, 8, 11, 12, 13, 14, 17, 18, 19, 20, 21, 25, 26, 28, 29, 30, 32, 34, 38, 39, 40, 41, 42, 48, 66, 71",
        bands5g: "1, 2, 3, 5, 7, 8, 12, 14, 20, 25, 26, 28, 29, 30, 38, 40, 41, 48, 66, 70, 71, 75, 76, 77, 78, 79 SA/NSA/Sub6",
        speed: "HSPA, LTE-A, 5G"
      },
      launch: {
        announced: "2024, May 07",
        status: "Available. Released 2024, May 15"
      },
      body: {
        dimensions: "281.6 x 215.5 x 5.1 mm (11.09 x 8.48 x 0.20 in)",
        weight: "579 g (Wi-Fi), 582 g (5G) (1.28 lb)",
        build: "Glass front, aluminum back, aluminum frame",
        sim: "eSIM",
        resistance: "Stylus support (Bluetooth integration, magnetic), Apple Pencil Pro support"
      },
      display: {
        type: "Ultra Retina Tandem OLED, 120Hz, HDR10, Dolby Vision, 1000 nits (HBM), 1600 nits (peak)",
        size: "13.0 inches, 513.2 cm2 (~84.6% screen-to-body ratio)",
        resolution: "2064 x 2752 pixels, 4:3 ratio (~264 ppi density)",
        protection: "Scratch-resistant glass, oleophobic coating",
        features: "Nano-texture display glass option on 1TB and 2TB models"
      },
      platform: {
        os: "iPadOS 17.4, upgradable to iPadOS 18",
        chipset: "Apple M4",
        cpu: "9-core (3 performance cores, 6 efficiency cores) - 256/512GB models\n10-core (4 performance cores, 6 efficiency cores) - 1/2TB models",
        gpu: "Apple GPU (10-core graphics), hardware-accelerated ray tracing"
      },
      memory: {
        cardSlot: "No",
        internal: "256GB 8GB RAM, 512GB 8GB RAM, 1TB 16GB RAM, 2TB 16GB RAM"
      },
      mainCamera: {
        modules: "12 MP, f/1.8, (wide), dual pixel PDAF\nTOF 3D LiDAR scanner (depth)",
        features: "Quad-LED dual-tone flash, HDR",
        video: "4K@24/25/30/60fps, 1080p@25/30/60/120/240fps; ProRes (4K), Cinematic mode (1080p), gyro-EIS"
      },
      selfieCamera: {
        modules: "12 MP, f/2.4, 122˚ (ultrawide), Center Stage",
        features: "Face ID, HDR",
        video: "1080p@25/30/60fps, gyro-EIS"
      },
      sound: {
        loudspeaker: "Yes, with stereo speakers (4 speakers)",
        jack35mm: "No"
      },
      comms: {
        wlan: "Wi-Fi 802.11 a/b/g/n/ac/6e, dual-band, hotspot",
        bluetooth: "5.3, A2DP, LE, EDR",
        positioning: "GPS, GLONASS, GALILEO, QZSS (5G model only)",
        nfc: "No",
        radio: "No",
        usb: "USB Type-C 4 (Thunderbolt 3), DisplayPort, magnetic connector"
      },
      features: {
        sensors: "Face ID, accelerometer, gyro, barometer"
      },
      battery: {
        type: "Li-Po 10290 mAh (38.99 Wh), non-removable",
        charging: "Wired"
      },
      misc: {
        colors: "Silver, Space Black",
        models: "A2925, A2926, A3007",
        price: "Rp 21.000.000 / $ 1,299.00 / £ 1,299.00 / € 1,549.00"
      }
    }
  },
  {
    id: "samsung-galaxy-tab-s10-ultra",
    name: "Samsung Galaxy Tab S10 Ultra",
    brand: "Samsung",
    slug: "samsung-galaxy-tab-s10-ultra",
    releasedYear: 2025,
    type: 'Tablet',
    image: "https://images.pexels.com/photos/11216260/pexels-photo-11216260.jpeg?auto=compress&cs=tinysrgb&w=800",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    specs: {
      network: {
        technology: "GSM / HSPA / LTE / 5G",
        bands2g: "GSM 850 / 900 / 1800 / 1900",
        bands3g: "HSDPA 850 / 900 / 1700(AWS) / 1900 / 2100",
        bands4g: "1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 20, 25, 26, 28, 32, 38, 40, 41, 66",
        bands5g: "1, 3, 5, 7, 8, 20, 28, 38, 40, 41, 66, 77, 78 SA/NSA/Sub6",
        speed: "HSPA, LTE-A, 5G"
      },
      launch: {
        announced: "2025, January 21",
        status: "Available. Released 2025, February 05"
      },
      body: {
        dimensions: "326.4 x 208.6 x 5.4 mm (12.85 x 8.21 x 0.21 in)",
        weight: "732 g (1.61 lb)",
        build: "Glass front, aluminum back, aluminum frame",
        sim: "Nano-SIM, eSIM",
        resistance: "IP68 dust/water resistant (up to 1.5m for 30 min), S Pen (Bluetooth integration, accelerometer, gyro)"
      },
      display: {
        type: "Dynamic AMOLED 2X, 120Hz, HDR10+, 1750 nits (peak)",
        size: "14.6 inches, 612.6 cm2 (~90.0% screen-to-body ratio)",
        resolution: "1848 x 2960 pixels, 16:10 ratio (~239 ppi density)",
        protection: "Corning Gorilla Glass Victus 2",
        features: "Always-on display"
      },
      platform: {
        os: "Android 15, One UI 7.1",
        chipset: "Qualcomm Snapdragon 8 Gen 4 (3 nm)",
        cpu: "Octa-core (2x4.0 GHz + 6x2.8 GHz)",
        gpu: "Adreno 840"
      },
      memory: {
        cardSlot: "microSDXC (dedicated slot)",
        internal: "256GB 12GB RAM, 512GB 12GB RAM, 1TB 16GB RAM (UFS 4.0)"
      },
      mainCamera: {
        modules: "13 MP, f/2.0, 26mm (wide), 1/3.4\", 1.0µm, AF\n8 MP, f/2.2, (ultrawide)",
        features: "LED flash, HDR, panorama",
        video: "4K@30/60fps, 1080p@30fps"
      },
      selfieCamera: {
        modules: "12 MP, f/2.2, 26mm (wide)\n12 MP, f/2.4, 120˚ (ultrawide)",
        features: "HDR",
        video: "4K@30/60fps, 1080p@30fps"
      },
      sound: {
        loudspeaker: "Yes, with stereo speakers (4 speakers), Tuned by AKG",
        jack35mm: "No"
      },
      comms: {
        wlan: "Wi-Fi 802.11 a/b/g/n/ac/6e/7, tri-band, Wi-Fi Direct",
        bluetooth: "5.4, A2DP, LE",
        positioning: "GPS, GLONASS, BDS, GALILEO",
        nfc: "No",
        radio: "No",
        usb: "USB Type-C 3.2, magnetic connector"
      },
      features: {
        sensors: "Fingerprint (under display, optical), accelerometer, gyro, proximity, compass, Wireless Samsung DeX"
      },
      battery: {
        type: "Li-Po 11200 mAh, non-removable",
        charging: "45W wired"
      },
      misc: {
        colors: "Graphite, Beige",
        models: "SM-X920, SM-X926B",
        price: "Rp 18.999.000 / $ 1,199.00 / £ 1,199.00 / € 1,339.00"
      }
    }
  },
  {
    id: "samsung-galaxy-s24-ultra",
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    slug: "samsung-galaxy-s24-ultra",
    releasedYear: 2024,
    type: 'Smartphone',
    image: "https://images.pexels.com/photos/11216260/pexels-photo-11216260.jpeg?auto=compress&cs=tinysrgb&w=800",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    specs: {
      network: { technology: "GSM / HSPA / LTE / 5G", bands2g: "GSM 850 / 900 / 1800 / 1900", bands3g: "HSDPA 850 / 900 / 1700 / 1900 / 2100", bands4g: "1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 38, 39, 40, 41, 66", bands5g: "1, 2, 3, 5, 7, 8, 12, 20, 25, 28, 38, 40, 41, 66, 77, 78 SA/NSA/Sub6", speed: "HSPA, LTE-A (up to 7CA), 5G" },
      launch: { announced: "2024, January 17", status: "Released 2024, January 24" },
      body: { dimensions: "162.3 x 79.0 x 8.6 mm", weight: "232 g", build: "Glass front (Gorilla Glass Armor), glass back (Gorilla Glass Armor), titanium frame (grade 2)", sim: "Nano-SIM and eSIM or Dual SIM", resistance: "IP68 dust/water resistant" },
      display: { type: "Dynamic LTPO AMOLED 2X, 120Hz, HDR10+, 2600 nits", size: "6.8 inches, 113.5 cm2", resolution: "1440 x 3120 pixels, 19.5:9 ratio", protection: "Corning Gorilla Glass Armor" },
      platform: { os: "Android 14, up to Android 15, One UI 6.1", chipset: "Snapdragon 8 Gen 3 (4 nm)", cpu: "8-core (1x3.39GHz Cortex-X4 & 3x3.1GHz Cortex-A720 & 2x2.9GHz Cortex-A720 & 2x2.2GHz Cortex-A520)", gpu: "Adreno 750 (1 GHz)" },
      memory: { cardSlot: "No", internal: "256GB 12GB RAM, 512GB 12GB RAM, 1TB 12GB RAM" },
      mainCamera: { modules: "200 MP, f/1.7 (wide) + 50 MP, f/3.4 (periscope telephoto) + 10 MP, f/2.4 (telephoto) + 12 MP, f/2.2 (ultrawide)", features: "LED flash, auto-HDR, panorama", video: "8K@24/30fps, 4K@30/60/120fps" },
      selfieCamera: { modules: "12 MP, f/2.2, 26mm (wide)", features: "Dual video call, Auto-HDR", video: "4K@30/60fps" },
      sound: { loudspeaker: "Yes, with stereo speakers", jack35mm: "No" },
      comms: { wlan: "Wi-Fi 802.11 a/b/g/n/ac/6e/7, tri-band", bluetooth: "5.3, A2DP, LE", positioning: "GPS, GLONASS, BDS, GALILEO", nfc: "Yes", radio: "No", usb: "USB Type-C 3.2, OTG" },
      features: { sensors: "Fingerprint (under display, ultrasonic), accelerometer, gyro, proximity, compass, barometer" },
      battery: { type: "Li-Ion 5000 mAh, non-removable", charging: "45W wired, 65% in 30 min" },
      misc: { colors: "Titanium Black, Titanium Gray, Titanium Violet, Titanium Yellow", models: "SM-S928B, SM-S928U", price: "Rp 21.999.000" }
    }
  },
  {
    id: "pixel-9-pro-xl",
    name: "Google Pixel 9 Pro XL",
    brand: "Google",
    slug: "google-pixel-9-pro-xl",
    releasedYear: 2024,
    type: 'Smartphone',
    image: "https://images.pexels.com/photos/11216260/pexels-photo-11216260.jpeg?auto=compress&cs=tinysrgb&w=800",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    specs: {
      network: { technology: "GSM / HSPA / LTE / 5G / Ultra Wideband (UWB)", bands2g: "GSM 850 / 900 / 1800 / 1900", bands3g: "HSDPA 850 / 900 / 1700 / 1900 / 2100", bands4g: "1, 2, 3, 4, 5, 7, 8, 12, 13, 14, 17, 18, 19, 20, 25, 26, 28, 29, 30, 32, 38, 39, 40, 41, 42, 48, 66, 71", bands5g: "1, 2, 3, 5, 7, 8, 12, 14, 20, 25, 26, 28, 29, 30, 38, 40, 41, 48, 66, 70, 71, 75, 76, 77, 78, 79 SA/NSA/Sub6", speed: "HSPA, LTE-A, 5G" },
      launch: { announced: "2024, August 13", status: "Released 2024, August 22" },
      body: { dimensions: "162.8 x 76.6 x 8.5 mm", weight: "221 g", build: "Glass front (Gorilla Glass Victus 2), glass back (Gorilla Glass Victus 2), aluminum frame", sim: "Nano-SIM and eSIM", resistance: "IP68 dust/water resistant" },
      display: { type: "LTPO OLED, 120Hz, HDR10+, 3000 nits (peak)", size: "6.8 inches, 114.4 cm2", resolution: "1344 x 2992 pixels, 20:9 ratio", protection: "Corning Gorilla Glass Victus 2" },
      platform: { os: "Android 14, upgradable to Android 15", chipset: "Google Tensor G4 (4 nm)", cpu: "8-core (1x3.1 GHz Cortex-X4 & 3x2.6 GHz Cortex-A720 & 4x1.92 GHz Cortex-A520)", gpu: "Mali-G715 MC11" },
      memory: { cardSlot: "No", internal: "128GB 16GB RAM, 256GB 16GB RAM, 512GB 16GB RAM, 1TB 16GB RAM" },
      mainCamera: { modules: "50 MP (wide) + 48 MP (periscope telephoto) + 48 MP (ultrawide)", features: "LED flash, Pixel Shift, Ultra-HDR, panorama", video: "8K@30fps, 4K@24/30/60fps" },
      selfieCamera: { modules: "42 MP, f/2.2, 17mm (wide), PDAF", features: "Auto-HDR, panorama", video: "4K@30/60fps" },
      sound: { loudspeaker: "Yes, with stereo speakers", jack35mm: "No" },
      comms: { wlan: "Wi-Fi 802.11 a/b/g/n/ac/6e/7, tri-band", bluetooth: "5.4, A2DP, LE, aptX HD", positioning: "GPS, GLONASS, GALILEO, QZSS, NavIC", nfc: "Yes", radio: "No", usb: "USB Type-C 3.2" },
      features: { sensors: "Fingerprint (under display, ultrasonic), accelerometer, gyro, proximity, compass, barometer, thermometer (skin temperature)" },
      battery: { type: "Li-Ion 5060 mAh, non-removable", charging: "45W wired, PD3.0, 70% in 30 min" },
      misc: { colors: "Obsidian, Porcelain, Hazel, Rose Quartz", models: "GEC77, GW8L7", price: "Rp 17.500.000" }
    }
  },
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    slug: "iphone-15-pro-max",
    releasedYear: 2023,
    type: 'Smartphone',
    image: "https://images.pexels.com/photos/11216260/pexels-photo-11216260.jpeg?auto=compress&cs=tinysrgb&w=800",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    specs: {
      network: { technology: "GSM / CDMA / HSPA / EVDO / LTE / 5G", bands2g: "GSM 850 / 900 / 1800 / 1900", bands3g: "HSDPA 850 / 900 / 1700(AWS) / 1900 / 2100", bands4g: "1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 25, 26, 28, 30, 32, 34, 38, 39, 40, 41, 42, 46, 48, 66", bands5g: "1, 2, 3, 5, 7, 8, 12, 20, 25, 26, 28, 30, 38, 40, 41, 48, 66, 70, 77, 78, 79 SA/NSA/Sub6", speed: "HSPA, LTE-A, 5G" },
      launch: { announced: "2023, September 12", status: "Released 2023, September 22" },
      body: { dimensions: "159.9 x 76.7 x 8.3 mm", weight: "221 g", build: "Glass front (Corning-made glass), glass back (Corning-made glass), titanium frame (grade 5)", sim: "Nano-SIM and eSIM", resistance: "IP68 dust/water resistant" },
      display: { type: "LTPO Super Retina XDR OLED, 120Hz, HDR10, Dolby Vision", size: "6.7 inches, 110.2 cm2", resolution: "1290 x 2796 pixels, 19.5:9 ratio", protection: "Ceramic Shield glass" },
      platform: { os: "iOS 17, upgradable to iOS 18", chipset: "Apple A17 Pro (3 nm)", cpu: "Hexa-core (2x3.78 GHz + 4x2.11 GHz)", gpu: "Apple GPU (6-core graphics)" },
      memory: { cardSlot: "No", internal: "256GB 8GB RAM, 512GB 8GB RAM, 1TB 8GB RAM" },
      mainCamera: { modules: "48 MP (wide) + 12 MP (periscope telephoto) + 12 MP (ultrawide) + TOF 3D LiDAR", features: "Dual-LED dual-tone flash, HDR (photo/panorama)", video: "4K@24/25/30/60fps, 1080p@25/30/60/120/240fps" },
      selfieCamera: { modules: "12 MP, f/1.9, 23mm (wide), PDAF, OIS", features: "HDR, Cinematic mode", video: "4K@24/25/30/60fps" },
      sound: { loudspeaker: "Yes, with stereo speakers", jack35mm: "No" },
      comms: { wlan: "Wi-Fi 802.11 a/b/g/n/ac/6e, dual-band", bluetooth: "5.3, A2DP, LE", positioning: "GPS (L1+L5), GLONASS, GALILEO, BDS, QZSS, NavIC", nfc: "Yes", radio: "No", usb: "USB Type-C 3.0" },
      features: { sensors: "Face ID, accelerometer, gyro, proximity, compass, barometer, Ultra Wideband 2 (UWB) support" },
      battery: { type: "Li-Ion 4441 mAh, non-removable", charging: "Wired, PD2.0, 50% in 30 min" },
      misc: { colors: "Black Titanium, White Titanium, Blue Titanium, Natural Titanium", models: "A3106, A2849", price: "Rp 18.999.000" }
    }
  }
];

// Injeksi brand global untuk memenuhi database GSMArena (Mock Data)
const MOCK_BRANDS = [
  "Xiaomi", "Oppo", "Realme", "Infinix", "Tecno", "Poco", "iQOO", "vivo", 
  "Asus", "Nokia", "Huawei", "Honor", "Sony", "Motorola", "Lenovo", "Advan", 
  "ZTE", "Meizu", "BlackBerry", "Alcatel", "Micromax", "Nothing", "Nubia", 
  "Fairphone", "TCL", "Panasonic", "Wiko", "Lava", "Itel", "HTC", "LG"
];

MOCK_BRANDS.forEach((brand, i) => {
  PHONE_SPECS.push({
    id: `mock-${brand.toLowerCase()}-${i}`,
    name: `${brand} X-Pro Ultra 2026`,
    brand: brand,
    slug: `mock-${brand.toLowerCase()}-${i}`,
    releasedYear: 2026,
    type: 'Smartphone',
    image: "https://images.pexels.com/photos/11216260/pexels-photo-11216260.jpeg?auto=compress&cs=tinysrgb&w=800",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    // Reuse spec structure from the first item
    specs: PHONE_SPECS[0].specs
  });
});
