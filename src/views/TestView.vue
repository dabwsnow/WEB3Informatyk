<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import TestQuestion from '../components/TestQuestion.vue'

const route = useRoute()
const category = computed(() => route.params.category)

// Данные тестов для каждой категории
const testsData = {
  // Wszystkie pytania - все вопросы из всех категорий
  'wszystkie': {
    name: 'Wszystkie kwalifikacje',
    title: 'Wszystkie pytania - Ponad 2000 pytań z wszystkich kwalifikacji',
    icon: '📚',
    questions: [
      // INF.02 / EE.08
      {
        id: 1,
        question: 'Który protokół jest używany do bezpiecznego przesyłania plików?',
        image: null,
        answers: [
          { id: 'a', text: 'FTP' },
          { id: 'b', text: 'SFTP' },
          { id: 'c', text: 'HTTP' },
          { id: 'd', text: 'SMTP' }
        ],
        correctAnswer: 'b',
        explanation: 'SFTP (SSH File Transfer Protocol) zapewnia bezpieczne szyfrowane połączenie do przesyłania plików.'
      },
      {
        id: 2,
        question: 'Jaka jest domyślna maska podsieci dla klasy C?',
        image: null,
        answers: [
          { id: 'a', text: '255.0.0.0' },
          { id: 'b', text: '255.255.0.0' },
          { id: 'c', text: '255.255.255.0' },
          { id: 'd', text: '255.255.255.255' }
        ],
        correctAnswer: 'c',
        explanation: 'Klasa C ma domyślną maskę 255.255.255.0, co daje 254 użyteczne adresy host w sieci.'
      },
      {
        id: 3,
        question: 'Który port używa protokół HTTPS?',
        image: null,
        answers: [
          { id: 'a', text: '80' },
          { id: 'b', text: '443' },
          { id: 'c', text: '8080' },
          { id: 'd', text: '22' }
        ],
        correctAnswer: 'b',
        explanation: 'HTTPS używa portu 443 do bezpiecznej komunikacji HTTP z szyfrowaniem SSL/TLS.'
      },
      // INF.03 / EE.09
      {
        id: 4,
        question: 'Która właściwość CSS służy do zmiany koloru tekstu?',
        image: null,
        answers: [
          { id: 'a', text: 'background-color' },
          { id: 'b', text: 'color' },
          { id: 'c', text: 'text-color' },
          { id: 'd', text: 'font-color' }
        ],
        correctAnswer: 'b',
        explanation: 'Właściwość "color" w CSS służy do ustawiania koloru tekstu elementu.'
      },
      {
        id: 5,
        question: 'Która metoda HTTP jest używana do wysyłania danych formularza?',
        image: null,
        answers: [
          { id: 'a', text: 'GET' },
          { id: 'b', text: 'POST' },
          { id: 'c', text: 'PUT' },
          { id: 'd', text: 'DELETE' }
        ],
        correctAnswer: 'b',
        explanation: 'POST jest standardową metodą do wysyłania danych formularza.'
      },
      {
        id: 6,
        question: 'Co oznacza SQL?',
        image: null,
        answers: [
          { id: 'a', text: 'Structured Query Language' },
          { id: 'b', text: 'Simple Query Language' },
          { id: 'c', text: 'Standard Question Language' },
          { id: 'd', text: 'System Query List' }
        ],
        correctAnswer: 'a',
        explanation: 'SQL to Structured Query Language - język strukturalnych zapytań.'
      },
      // INF.04 / E.14
      {
        id: 7,
        question: 'Która funkcja w JavaScript służy do wyświetlania komunikatu w konsoli?',
        image: null,
        answers: [
          { id: 'a', text: 'alert()' },
          { id: 'b', text: 'console.log()' },
          { id: 'c', text: 'print()' },
          { id: 'd', text: 'display()' }
        ],
        correctAnswer: 'b',
        explanation: 'console.log() wyświetla informacje w konsoli przeglądarki.'
      },
      {
        id: 8,
        question: 'Co to jest JSON?',
        image: null,
        answers: [
          { id: 'a', text: 'JavaScript Object Notation' },
          { id: 'b', text: 'Java Standard Object Notation' },
          { id: 'c', text: 'JavaScript Ordered Network' },
          { id: 'd', text: 'Java Source Object Node' }
        ],
        correctAnswer: 'a',
        explanation: 'JSON to lekki format wymiany danych.'
      },
      {
        id: 9,
        question: 'Która z poniższych jest frameworkiem JavaScript?',
        image: null,
        answers: [
          { id: 'a', text: 'Python' },
          { id: 'b', text: 'Vue.js' },
          { id: 'c', text: 'PHP' },
          { id: 'd', text: 'MySQL' }
        ],
        correctAnswer: 'b',
        explanation: 'Vue.js jest popularnym frameworkiem JavaScript.'
      },
      // E.12
      {
        id: 10,
        question: 'Która magistrala jest używana do podłączania dysków SSD?',
        image: null,
        answers: [
          { id: 'a', text: 'PCI' },
          { id: 'b', text: 'AGP' },
          { id: 'c', text: 'SATA' },
          { id: 'd', text: 'ISA' }
        ],
        correctAnswer: 'c',
        explanation: 'SATA to standard interfejsu do podłączania dysków.'
      },
      {
        id: 11,
        question: 'Ile pinów ma złącze procesora Intel LGA 1200?',
        image: null,
        answers: [
          { id: 'a', text: '1150' },
          { id: 'b', text: '1151' },
          { id: 'c', text: '1200' },
          { id: 'd', text: '1700' }
        ],
        correctAnswer: 'c',
        explanation: 'LGA 1200 to gniazdo z 1200 pinami.'
      },
      {
        id: 12,
        question: 'Co oznacza skrót RAM?',
        image: null,
        answers: [
          { id: 'a', text: 'Read Access Memory' },
          { id: 'b', text: 'Random Access Memory' },
          { id: 'c', text: 'Rapid Access Module' },
          { id: 'd', text: 'Real Access Memory' }
        ],
        correctAnswer: 'b',
        explanation: 'RAM to Random Access Memory - pamięć o swobodnym dostępie.'
      },
      // E.13
      {
        id: 13,
        question: 'Jaki jest zakres adresów IP klasy A?',
        image: null,
        answers: [
          { id: 'a', text: '1.0.0.0 - 126.255.255.255' },
          { id: 'b', text: '128.0.0.0 - 191.255.255.255' },
          { id: 'c', text: '192.0.0.0 - 223.255.255.255' },
          { id: 'd', text: '224.0.0.0 - 239.255.255.255' }
        ],
        correctAnswer: 'a',
        explanation: 'Klasa A obejmuje adresy od 1.0.0.0 do 126.255.255.255.'
      },
      {
        id: 14,
        question: 'Który protokół służy do automatycznego przydzielania adresów IP?',
        image: null,
        answers: [
          { id: 'a', text: 'DNS' },
          { id: 'b', text: 'DHCP' },
          { id: 'c', text: 'FTP' },
          { id: 'd', text: 'SMTP' }
        ],
        correctAnswer: 'b',
        explanation: 'DHCP automatycznie przydziela adresy IP.'
      },
      {
        id: 15,
        question: 'Jaka jest maksymalna długość kabla Ethernet Cat5e?',
        image: null,
        answers: [
          { id: 'a', text: '50 metrów' },
          { id: 'b', text: '100 metrów' },
          { id: 'c', text: '150 metrów' },
          { id: 'd', text: '200 metrów' }
        ],
        correctAnswer: 'b',
        explanation: 'Maksymalna długość to 100 metrów.'
      }
      // Тут можно добавить еще сотни вопросов...
    ]
  },
  // INF.02 / EE.08 - 40 вопросов
  'inf02-40': {
    name: 'INF.02 / EE.08',
    title: 'Test 40 pytań - Administracja i eksploatacja systemów komputerowych',
    icon: '🖥️',
    questions: [
      {
        id: 1,
        question: 'Który protokół jest używany do bezpiecznego przesyłania plików?',
        image: null,
        answers: [
          { id: 'a', text: 'FTP' },
          { id: 'b', text: 'SFTP' },
          { id: 'c', text: 'HTTP' },
          { id: 'd', text: 'SMTP' }
        ],
        correctAnswer: 'b',
        explanation: 'SFTP (SSH File Transfer Protocol) zapewnia bezpieczne szyfrowane połączenie do przesyłania plików.'
      },
      {
        id: 2,
        question: 'Jaka jest domyślna maska podsieci dla klasy C?',
        image: null,
        answers: [
          { id: 'a', text: '255.0.0.0' },
          { id: 'b', text: '255.255.0.0' },
          { id: 'c', text: '255.255.255.0' },
          { id: 'd', text: '255.255.255.255' }
        ],
        correctAnswer: 'c',
        explanation: 'Klasa C ma domyślną maskę 255.255.255.0, co daje 254 użyteczne adresy host w sieci.'
      },
      {
        id: 3,
        question: 'Który port używa protokół HTTPS?',
        image: null,
        answers: [
          { id: 'a', text: '80' },
          { id: 'b', text: '443' },
          { id: 'c', text: '8080' },
          { id: 'd', text: '22' }
        ],
        correctAnswer: 'b',
        explanation: 'HTTPS używa portu 443 do bezpiecznej komunikacji HTTP z szyfrowaniem SSL/TLS.'
      }
    ]
  },
  // INF.02 / EE.08 - 20 вопросов
  'inf02-20': {
    name: 'INF.02 / EE.08',
    title: 'Test 20 pytań - Administracja systemami i sieciami',
    icon: '🖥️',
    questions: [
      {
        id: 1,
        question: 'Który protokół jest używany do bezpiecznego przesyłania plików?',
        image: null,
        answers: [
          { id: 'a', text: 'FTP' },
          { id: 'b', text: 'SFTP' },
          { id: 'c', text: 'HTTP' },
          { id: 'd', text: 'SMTP' }
        ],
        correctAnswer: 'b',
        explanation: 'SFTP (SSH File Transfer Protocol) zapewnia bezpieczne szyfrowane połączenie do przesyłania plików.'
      },
      {
        id: 2,
        question: 'Jaka jest domyślna maska podsieci dla klasy C?',
        image: null,
        answers: [
          { id: 'a', text: '255.0.0.0' },
          { id: 'b', text: '255.255.0.0' },
          { id: 'c', text: '255.255.255.0' },
          { id: 'd', text: '255.255.255.255' }
        ],
        correctAnswer: 'c',
        explanation: 'Klasa C ma domyślną maskę 255.255.255.0, co daje 254 użyteczne adresy host w sieci.'
      }
    ]
  },
  // INF.02 / EE.08 - 1 рандомный
  'inf02-1': {
    name: 'INF.02 / EE.08',
    title: 'Losowe pytanie - Administracja systemami',
    icon: '🖥️',
    questions: [
      {
        id: 1,
        question: 'Który port używa protokół HTTPS?',
        image: null,
        answers: [
          { id: 'a', text: '80' },
          { id: 'b', text: '443' },
          { id: 'c', text: '8080' },
          { id: 'd', text: '22' }
        ],
        correctAnswer: 'b',
        explanation: 'HTTPS używa portu 443 do bezpiecznej komunikacji HTTP z szyfrowaniem SSL/TLS.'
      }
    ]
  },
  // INF.03 / EE.09 - 40 вопросов
  'inf03-40': {
    name: 'INF.03 / EE.09',
    title: 'Test 40 pytań - Tworzenie i administrowanie stronami i aplikacjami internetowymi',
    icon: '💾',
    questions: [
      {
        id: 1,
        question: 'Która właściwość CSS służy do zmiany koloru tekstu?',
        image: null,
        answers: [
          { id: 'a', text: 'background-color' },
          { id: 'b', text: 'color' },
          { id: 'c', text: 'text-color' },
          { id: 'd', text: 'font-color' }
        ],
        correctAnswer: 'b',
        explanation: 'Właściwość "color" w CSS służy do ustawiania koloru tekstu elementu.'
      },
      {
        id: 2,
        question: 'Która metoda HTTP jest używana do wysyłania danych formularza?',
        image: null,
        answers: [
          { id: 'a', text: 'GET' },
          { id: 'b', text: 'POST' },
          { id: 'c', text: 'PUT' },
          { id: 'd', text: 'DELETE' }
        ],
        correctAnswer: 'b',
        explanation: 'POST jest standardową metodą do wysyłania danych formularza.'
      },
      {
        id: 3,
        question: 'Co oznacza SQL?',
        image: null,
        answers: [
          { id: 'a', text: 'Structured Query Language' },
          { id: 'b', text: 'Simple Query Language' },
          { id: 'c', text: 'Standard Question Language' },
          { id: 'd', text: 'System Query List' }
        ],
        correctAnswer: 'a',
        explanation: 'SQL to Structured Query Language - język strukturalnych zapytań.'
      }
    ]
  },
  // INF.03 / EE.09 - 20 вопросов
  'inf03-20': {
    name: 'INF.03 / EE.09',
    title: 'Test 20 pytań - Tworzenie stron i baz danych',
    icon: '💾',
    questions: [
      {
        id: 1,
        question: 'Która właściwość CSS służy do zmiany koloru tekstu?',
        image: null,
        answers: [
          { id: 'a', text: 'background-color' },
          { id: 'b', text: 'color' },
          { id: 'c', text: 'text-color' },
          { id: 'd', text: 'font-color' }
        ],
        correctAnswer: 'b',
        explanation: 'Właściwość "color" w CSS służy do ustawiania koloru tekstu elementu.'
      },
      {
        id: 2,
        question: 'Która metoda HTTP jest używana do wysyłania danych formularza?',
        image: null,
        answers: [
          { id: 'a', text: 'GET' },
          { id: 'b', text: 'POST' },
          { id: 'c', text: 'PUT' },
          { id: 'd', text: 'DELETE' }
        ],
        correctAnswer: 'b',
        explanation: 'POST jest standardową metodą do wysyłania danych formularza.'
      }
    ]
  },
  // INF.03 / EE.09 - 1 рандомный
  'inf03-1': {
    name: 'INF.03 / EE.09',
    title: 'Losowe pytanie - Tworzenie aplikacji',
    icon: '💾',
    questions: [
      {
        id: 1,
        question: 'Co oznacza SQL?',
        image: null,
        answers: [
          { id: 'a', text: 'Structured Query Language' },
          { id: 'b', text: 'Simple Query Language' },
          { id: 'c', text: 'Standard Question Language' },
          { id: 'd', text: 'System Query List' }
        ],
        correctAnswer: 'a',
        explanation: 'SQL to Structured Query Language - język strukturalnych zapytań.'
      }
    ]
  },
  // INF.04 / E.14 - 40 вопросов
  'inf04-40': {
    name: 'INF.04 / E.14',
    title: 'Test 40 pytań - Tworzenie aplikacji internetowych i baz danych',
    icon: '📱',
    questions: [
      {
        id: 1,
        question: 'Która funkcja w JavaScript służy do wyświetlania komunikatu w konsoli?',
        image: null,
        answers: [
          { id: 'a', text: 'alert()' },
          { id: 'b', text: 'console.log()' },
          { id: 'c', text: 'print()' },
          { id: 'd', text: 'display()' }
        ],
        correctAnswer: 'b',
        explanation: 'console.log() wyświetla informacje w konsoli przeglądarki.'
      },
      {
        id: 2,
        question: 'Co to jest JSON?',
        image: null,
        answers: [
          { id: 'a', text: 'JavaScript Object Notation' },
          { id: 'b', text: 'Java Standard Object Notation' },
          { id: 'c', text: 'JavaScript Ordered Network' },
          { id: 'd', text: 'Java Source Object Node' }
        ],
        correctAnswer: 'a',
        explanation: 'JSON to lekki format wymiany danych.'
      },
      {
        id: 3,
        question: 'Która z poniższych jest frameworkiem JavaScript?',
        image: null,
        answers: [
          { id: 'a', text: 'Python' },
          { id: 'b', text: 'Vue.js' },
          { id: 'c', text: 'PHP' },
          { id: 'd', text: 'MySQL' }
        ],
        correctAnswer: 'b',
        explanation: 'Vue.js jest popularnym frameworkiem JavaScript.'
      }
    ]
  },
  // INF.04 / E.14 - 20 вопросов
  'inf04-20': {
    name: 'INF.04 / E.14',
    title: 'Test 20 pytań - Programowanie aplikacji',
    icon: '📱',
    questions: [
      {
        id: 1,
        question: 'Która funkcja w JavaScript służy do wyświetlania komunikatu w konsoli?',
        image: null,
        answers: [
          { id: 'a', text: 'alert()' },
          { id: 'b', text: 'console.log()' },
          { id: 'c', text: 'print()' },
          { id: 'd', text: 'display()' }
        ],
        correctAnswer: 'b',
        explanation: 'console.log() wyświetla informacje w konsoli przeglądarki.'
      },
      {
        id: 2,
        question: 'Co to jest JSON?',
        image: null,
        answers: [
          { id: 'a', text: 'JavaScript Object Notation' },
          { id: 'b', text: 'Java Standard Object Notation' },
          { id: 'c', text: 'JavaScript Ordered Network' },
          { id: 'd', text: 'Java Source Object Node' }
        ],
        correctAnswer: 'a',
        explanation: 'JSON to lekki format wymiany danych.'
      }
    ]
  },
  // INF.04 / E.14 - 1 рандомный
  'inf04-1': {
    name: 'INF.04 / E.14',
    title: 'Losowe pytanie - Programowanie',
    icon: '📱',
    questions: [
      {
        id: 1,
        question: 'Która z poniższych jest frameworkiem JavaScript?',
        image: null,
        answers: [
          { id: 'a', text: 'Python' },
          { id: 'b', text: 'Vue.js' },
          { id: 'c', text: 'PHP' },
          { id: 'd', text: 'MySQL' }
        ],
        correctAnswer: 'b',
        explanation: 'Vue.js jest popularnym frameworkiem JavaScript.'
      }
    ]
  },
  // E.12 - 40 вопросов
  'e12-40': {
    name: 'E.12',
    title: 'Test 40 pytań - Montaż i eksploatacja komputerów',
    icon: '🔌',
    questions: [
      {
        id: 1,
        question: 'Która magistrala jest używana do podłączania dysków SSD?',
        image: null,
        answers: [
          { id: 'a', text: 'PCI' },
          { id: 'b', text: 'AGP' },
          { id: 'c', text: 'SATA' },
          { id: 'd', text: 'ISA' }
        ],
        correctAnswer: 'c',
        explanation: 'SATA to standard interfejsu do podłączania dysków.'
      },
      {
        id: 2,
        question: 'Ile pinów ma złącze procesora Intel LGA 1200?',
        image: null,
        answers: [
          { id: 'a', text: '1150' },
          { id: 'b', text: '1151' },
          { id: 'c', text: '1200' },
          { id: 'd', text: '1700' }
        ],
        correctAnswer: 'c',
        explanation: 'LGA 1200 to gniazdo z 1200 pinami.'
      },
      {
        id: 3,
        question: 'Co oznacza skrót RAM?',
        image: null,
        answers: [
          { id: 'a', text: 'Read Access Memory' },
          { id: 'b', text: 'Random Access Memory' },
          { id: 'c', text: 'Rapid Access Module' },
          { id: 'd', text: 'Real Access Memory' }
        ],
        correctAnswer: 'b',
        explanation: 'RAM to Random Access Memory - pamięć o swobodnym dostępie.'
      }
    ]
  },
  // E.12 - 20 вопросов
  'e12-20': {
    name: 'E.12',
    title: 'Test 20 pytań - Montaż sprzętu',
    icon: '🔌',
    questions: [
      {
        id: 1,
        question: 'Która magistrala jest używana do podłączania dysków SSD?',
        image: null,
        answers: [
          { id: 'a', text: 'PCI' },
          { id: 'b', text: 'AGP' },
          { id: 'c', text: 'SATA' },
          { id: 'd', text: 'ISA' }
        ],
        correctAnswer: 'c',
        explanation: 'SATA to standard interfejsu do podłączania dysków.'
      },
      {
        id: 2,
        question: 'Ile pinów ma złącze procesora Intel LGA 1200?',
        image: null,
        answers: [
          { id: 'a', text: '1150' },
          { id: 'b', text: '1151' },
          { id: 'c', text: '1200' },
          { id: 'd', text: '1700' }
        ],
        correctAnswer: 'c',
        explanation: 'LGA 1200 to gniazdo z 1200 pinami.'
      }
    ]
  },
  // E.12 - 1 рандомный
  'e12-1': {
    name: 'E.12',
    title: 'Losowe pytanie - Eksploatacja sprzętu',
    icon: '🔌',
    questions: [
      {
        id: 1,
        question: 'Co oznacza skrót RAM?',
        image: null,
        answers: [
          { id: 'a', text: 'Read Access Memory' },
          { id: 'b', text: 'Random Access Memory' },
          { id: 'c', text: 'Rapid Access Module' },
          { id: 'd', text: 'Real Access Memory' }
        ],
        correctAnswer: 'b',
        explanation: 'RAM to Random Access Memory - pamięć o swobodnym dostępie.'
      }
    ]
  },
  // E.13 - 40 вопросов
  'e13-40': {
    name: 'E.13',
    title: 'Test 40 pytań - Projektowanie sieci',
    icon: '⚡',
    questions: [
      {
        id: 1,
        question: 'Jaki jest zakres adresów IP klasy A?',
        image: null,
        answers: [
          { id: 'a', text: '1.0.0.0 - 126.255.255.255' },
          { id: 'b', text: '128.0.0.0 - 191.255.255.255' },
          { id: 'c', text: '192.0.0.0 - 223.255.255.255' },
          { id: 'd', text: '224.0.0.0 - 239.255.255.255' }
        ],
        correctAnswer: 'a',
        explanation: 'Klasa A obejmuje adresy od 1.0.0.0 do 126.255.255.255.'
      },
      {
        id: 2,
        question: 'Który protokół służy do automatycznego przydzielania adresów IP?',
        image: null,
        answers: [
          { id: 'a', text: 'DNS' },
          { id: 'b', text: 'DHCP' },
          { id: 'c', text: 'FTP' },
          { id: 'd', text: 'SMTP' }
        ],
        correctAnswer: 'b',
        explanation: 'DHCP automatycznie przydziela adresy IP.'
      },
      {
        id: 3,
        question: 'Jaka jest maksymalna długość kabla Ethernet Cat5e?',
        image: null,
        answers: [
          { id: 'a', text: '50 metrów' },
          { id: 'b', text: '100 metrów' },
          { id: 'c', text: '150 metrów' },
          { id: 'd', text: '200 metrów' }
        ],
        correctAnswer: 'b',
        explanation: 'Maksymalna długość to 100 metrów.'
      }
    ]
  },
  // E.13 - 20 вопросов
  'e13-20': {
    name: 'E.13',
    title: 'Test 20 pytań - Administrowanie sieciami',
    icon: '⚡',
    questions: [
      {
        id: 1,
        question: 'Jaki jest zakres adresów IP klasy A?',
        image: null,
        answers: [
          { id: 'a', text: '1.0.0.0 - 126.255.255.255' },
          { id: 'b', text: '128.0.0.0 - 191.255.255.255' },
          { id: 'c', text: '192.0.0.0 - 223.255.255.255' },
          { id: 'd', text: '224.0.0.0 - 239.255.255.255' }
        ],
        correctAnswer: 'a',
        explanation: 'Klasa A obejmuje adresy od 1.0.0.0 do 126.255.255.255.'
      },
      {
        id: 2,
        question: 'Który protokół służy do automatycznego przydzielania adresów IP?',
        image: null,
        answers: [
          { id: 'a', text: 'DNS' },
          { id: 'b', text: 'DHCP' },
          { id: 'c', text: 'FTP' },
          { id: 'd', text: 'SMTP' }
        ],
        correctAnswer: 'b',
        explanation: 'DHCP automatycznie przydziela adresy IP.'
      }
    ]
  },
  // E.13 - 1 рандомный
  'e13-1': {
    name: 'E.13',
    title: 'Losowe pytanie - Mechatronika',
    icon: '⚡',
    questions: [
      {
        id: 1,
        question: 'Jaka jest maksymalna długość kabla Ethernet Cat5e?',
        image: null,
        answers: [
          { id: 'a', text: '50 metrów' },
          { id: 'b', text: '100 metrów' },
          { id: 'c', text: '150 metrów' },
          { id: 'd', text: '200 metrów' }
        ],
        correctAnswer: 'b',
        explanation: 'Maksymalna długość to 100 metrów.'
      }
    ]
  }
}

const currentTest = computed(() => testsData[category.value] || null)
const userAnswers = ref({})
const showResults = ref(false)
const timeLeft = ref(0)
const timerInterval = ref(null)

// Определяем время в зависимости от категории
const getInitialTime = () => {
  const cat = category.value
  if (cat === 'wszystkie') return 300 * 60 // 300 минут (5 часов) для всех вопросов
  if (cat.endsWith('-40')) return 60 * 60 // 60 минут для 40 вопросов
  if (cat.endsWith('-20')) return 30 * 60 // 30 минут для 20 вопросов
  if (cat.endsWith('-1')) return 5 * 60  // 5 минут для 1 вопроса
  return 60 * 60
}

// Проверяем является ли тест с 1 вопросом
const isSingleQuestion = computed(() => {
  return category.value.endsWith('-1')
})

const correctAnswersCount = computed(() => {
  if (!currentTest.value) return 0
  let count = 0
  currentTest.value.questions.forEach(q => {
    if (userAnswers.value[q.id] === q.correctAnswer) {
      count++
    }
  })
  return count
})

const scorePercentage = computed(() => {
  if (!currentTest.value) return 0
  return Math.round((correctAnswersCount.value / currentTest.value.questions.length) * 100)
})

const formatTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60)
  const seconds = timeLeft.value % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
})

const startTimer = () => {
  timerInterval.value = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      finishTest()
    }
  }, 1000)
}

const selectAnswer = (questionId, answerId) => {
  userAnswers.value[questionId] = answerId
  
  // Если это тест с 1 вопросом, сразу показываем результат
  if (isSingleQuestion.value) {
    setTimeout(() => {
      showResults.value = true
      clearInterval(timerInterval.value)
    }, 300) // Небольшая задержка для анимации
  }
}

const nextRandomQuestion = () => {
  // Сбрасываем состояние для следующего вопроса
  userAnswers.value = {}
  showResults.value = false
  timeLeft.value = getInitialTime()
  startTimer()
}

const finishTest = () => {
  showResults.value = true
  clearInterval(timerInterval.value)
  
  // Плавный скролл вверх страницы
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, 100)
}

onMounted(() => {
  if (currentTest.value) {
    timeLeft.value = getInitialTime()
    startTimer()
  }
})
</script>

<template>
  <div v-if="currentTest" class="test-view">
    <div class="test-header">
      <div class="test-info">
        <div class="test-category">
          <span class="category-icon">{{ currentTest.icon }}</span>
          <span class="category-name">{{ currentTest.name }}</span>
        </div>
        <h1 class="test-title">{{ currentTest.title }}</h1>
      </div>
      <div class="test-timer" :class="{ warning: timeLeft < 300 }">
        <svg class="timer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" stroke-width="2"/>
          <path d="M12 6v6l4 2" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <span class="timer-text">{{ formatTime }}</span>
      </div>
    </div>

    <div v-if="!showResults" class="test-content">
      <div class="progress-info">
        <div class="answered-count">
          Odpowiedziano: {{ Object.keys(userAnswers).length }} / {{ currentTest.questions.length }}
        </div>
      </div>

      <div class="all-questions">
        <TestQuestion
          v-for="(question, index) in currentTest.questions"
          :key="question.id"
          :question="question"
          :question-number="index + 1"
          :total-questions="currentTest.questions.length"
          :selected-answer="userAnswers[question.id]"
          @answer-selected="(answerId) => selectAnswer(question.id, answerId)"
        />
      </div>

      <div class="controls">
        <button
          v-if="!isSingleQuestion"
          @click="finishTest"
          class="control-btn finish-btn"
          :disabled="Object.keys(userAnswers).length < currentTest.questions.length"
        >
          Zakończ test
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M5 13l4 4L19 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>

    <div v-else class="results-view">
      <!-- Для теста с 1 вопросом - компактный результат -->
      <div v-if="isSingleQuestion" class="single-question-result">
        <div class="result-card">
          <div class="result-icon" :class="{ correct: userAnswers[currentTest.questions[0].id] === currentTest.questions[0].correctAnswer }">
            <svg v-if="userAnswers[currentTest.questions[0].id] === currentTest.questions[0].correctAnswer" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 13l4 4L19 7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M6 18L18 6M6 6l12 12" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          
          <h2 class="result-title">
            {{ userAnswers[currentTest.questions[0].id] === currentTest.questions[0].correctAnswer ? 'Poprawna odpowiedź!' : 'Błędna odpowiedź' }}
          </h2>
          
          <div class="question-review">
            <p class="question-text-review">{{ currentTest.questions[0].question }}</p>
            
            <div class="answers-review">
              <div
                v-for="answer in currentTest.questions[0].answers"
                :key="answer.id"
                class="answer-review"
                :class="{
                  correct: answer.id === currentTest.questions[0].correctAnswer,
                  selected: userAnswers[currentTest.questions[0].id] === answer.id,
                  incorrect: userAnswers[currentTest.questions[0].id] === answer.id && answer.id !== currentTest.questions[0].correctAnswer
                }"
              >
                <span class="answer-letter-small">{{ answer.id.toUpperCase() }}</span>
                <span>{{ answer.text }}</span>
              </div>
            </div>
            
            <div class="explanation-box">
              <strong>Wyjaśnienie:</strong> {{ currentTest.questions[0].explanation }}
            </div>
          </div>
          
          <div class="single-question-actions">
            <button @click="nextRandomQuestion" class="next-question-btn">
              Następne pytanie
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 18l6-6-6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button @click="$router.push('/tests')" class="back-to-list-btn">
              Wróć do listy testów
            </button>
          </div>
        </div>
      </div>
      
      <!-- Для тестов с 20 и 40 вопросами - полный результат -->
      <div v-else>
        <div class="results-header">
        <div class="score-circle" :class="{ passed: scorePercentage >= 50 }">
          <div class="score-percentage">{{ scorePercentage }}%</div>
          <div class="score-label">{{ scorePercentage >= 50 ? 'Zaliczone!' : 'Niezaliczone' }}</div>
        </div>
        <div class="results-stats">
          <div class="stat">
            <div class="stat-value">{{ correctAnswersCount }}</div>
            <div class="stat-label">Poprawne odpowiedzi</div>
          </div>
          <div class="stat">
            <div class="stat-value">{{ currentTest.questions.length - correctAnswersCount }}</div>
            <div class="stat-label">Błędne odpowiedzi</div>
          </div>
          <div class="stat">
            <div class="stat-value">{{ currentTest.questions.length }}</div>
            <div class="stat-label">Wszystkie pytania</div>
          </div>
        </div>
      </div>

      <div class="results-questions">
        <h2>Przegląd odpowiedzi</h2>
        <div
          v-for="(question, index) in currentTest.questions"
          :key="question.id"
          class="result-question"
        >
          <div class="result-header">
            <span class="result-number">Pytanie {{ index + 1 }}</span>
            <span
              class="result-badge"
              :class="userAnswers[question.id] === question.correctAnswer ? 'correct' : 'incorrect'"
            >
              {{ userAnswers[question.id] === question.correctAnswer ? '✓ Poprawna' : '✗ Błędna' }}
            </span>
          </div>
          <p class="result-question-text">{{ question.question }}</p>
          <div class="result-answers">
            <div
              v-for="answer in question.answers"
              :key="answer.id"
              class="result-answer"
              :class="{
                correct: answer.id === question.correctAnswer,
                selected: userAnswers[question.id] === answer.id,
                incorrect: userAnswers[question.id] === answer.id && answer.id !== question.correctAnswer
              }"
            >
              {{ answer.id.toUpperCase() }}. {{ answer.text }}
            </div>
          </div>
          <div class="result-explanation">
            <strong>Wyjaśnienie:</strong> {{ question.explanation }}
          </div>
        </div>
      </div>

      <button @click="$router.push('/tests')" class="back-btn">
        Wróć do listy testów
      </button>
      </div>
    </div>
  </div>

  <div v-else class="error-view">
    <h1>Nie znaleziono testu</h1>
    <p>Kategoria "{{ category }}" nie istnieje</p>
    <button @click="$router.push('/tests')" class="back-btn">
      Wróć do listy testów
    </button>
  </div>
</template>

<style scoped>
.test-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.test-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
  gap: 20px;
}

.test-info {
  flex: 1;
}

.test-category {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.category-icon {
  font-size: 2rem;
}

.category-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #667eea;
}

.test-title {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--color-text, #333);
  line-height: 1.3;
}

.test-timer {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  background: var(--color-bg, #fff);
  border: 2px solid var(--color-border, #e0e0e0);
  border-radius: 12px;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text, #333);
}

.test-timer.warning {
  border-color: #ef4444;
  color: #ef4444;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.timer-icon {
  width: 24px;
  height: 24px;
}

.progress-info {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.answered-count {
  padding: 12px 24px;
  background: rgba(102, 126, 234, 0.1);
  border: 2px solid rgba(102, 126, 234, 0.3);
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 700;
  color: #667eea;
}

.all-questions {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 40px;
}

.controls {
  display: flex;
  justify-content: center;
  margin-top: 40px;
  gap: 16px;
}

.control-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 32px;
  background: var(--color-bg, #fff);
  border: 2px solid var(--color-border, #e0e0e0);
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text, #333);
  cursor: pointer;
  transition: all 0.3s ease;
}

.control-btn:hover:not(:disabled) {
  border-color: #667eea;
  transform: translateY(-2px);
}

.control-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.control-btn svg {
  width: 20px;
  height: 20px;
}

.finish-btn {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-color: transparent;
  color: white;
  padding: 16px 48px;
  font-size: 1.2rem;
}

.results-view {
  padding: 40px 20px;
}

.single-question-result {
  max-width: 800px;
  margin: 0 auto;
}

.result-card {
  background: var(--color-bg, #fff);
  border: 1px solid var(--color-border, #e0e0e0);
  border-radius: 20px;
  padding: 40px;
  text-align: center;
}

.result-icon {
  width: 100px;
  height: 100px;
  margin: 0 auto 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(239, 68, 68, 0.1);
  border: 4px solid #ef4444;
}

.result-icon.correct {
  background: rgba(34, 197, 94, 0.1);
  border-color: #22c55e;
}

.result-icon svg {
  width: 50px;
  height: 50px;
  stroke-width: 3;
}

.result-icon.correct svg {
  stroke: #22c55e;
}

.result-icon:not(.correct) svg {
  stroke: #ef4444;
}

.result-title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-text, #333);
  margin-bottom: 30px;
}

.question-review {
  text-align: left;
  margin-bottom: 30px;
}

.question-text-review {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-text, #333);
  margin-bottom: 20px;
  line-height: 1.5;
}

.answers-review {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.answer-review {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  background: var(--color-bg-hover, #f5f5f5);
  border: 2px solid transparent;
  border-radius: 10px;
  font-size: 0.95rem;
}

.answer-review.correct {
  background: rgba(34, 197, 94, 0.1);
  border-color: #22c55e;
  font-weight: 600;
}

.answer-review.incorrect {
  background: rgba(239, 68, 68, 0.1);
  border-color: #ef4444;
}

.answer-letter-small {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.explanation-box {
  padding: 16px;
  background: rgba(102, 126, 234, 0.05);
  border-left: 4px solid #667eea;
  border-radius: 8px;
  font-size: 0.95rem;
  color: var(--color-text, #333);
  line-height: 1.6;
  text-align: left;
}

.single-question-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 30px;
}

.next-question-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 32px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.next-question-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
}

.next-question-btn svg {
  width: 20px;
  height: 20px;
}

.back-to-list-btn {
  width: 100%;
  padding: 14px 32px;
  background: transparent;
  border: 2px solid var(--color-border, #e0e0e0);
  border-radius: 12px;
  color: var(--color-text, #333);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-to-list-btn:hover {
  border-color: #667eea;
  color: #667eea;
}

.results-header {
  text-align: center;
  margin-bottom: 60px;
}

.score-circle {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.2));
  border: 8px solid #ef4444;
  margin-bottom: 30px;
}

.score-circle.passed {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.2));
  border-color: #22c55e;
}

.score-percentage {
  font-size: 3.5rem;
  font-weight: 800;
  color: var(--color-text, #333);
}

.score-label {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-subtext, #666);
}

.results-stats {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
}

.stat {
  text-align: center;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 800;
  color: #667eea;
}

.stat-label {
  font-size: 0.95rem;
  color: var(--color-subtext, #666);
  margin-top: 8px;
}

.results-questions h2 {
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 30px;
}

.result-question {
  background: var(--color-bg, #fff);
  border: 1px solid var(--color-border, #e0e0e0);
  border-radius: 16px;
  padding: 28px;
  margin-bottom: 24px;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.result-number {
  font-weight: 700;
  color: var(--color-subtext, #666);
}

.result-badge {
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
}

.result-badge.correct {
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
}

.result-badge.incorrect {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
}

.result-question-text {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text, #333);
  margin-bottom: 20px;
}

.result-answers {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.result-answer {
  padding: 14px 18px;
  background: var(--color-bg-hover, #f5f5f5);
  border: 2px solid transparent;
  border-radius: 10px;
  font-size: 0.95rem;
}

.result-answer.correct {
  background: rgba(34, 197, 94, 0.1);
  border-color: #22c55e;
  font-weight: 600;
}

.result-answer.incorrect {
  background: rgba(239, 68, 68, 0.1);
  border-color: #ef4444;
}

.result-explanation {
  padding: 16px;
  background: rgba(102, 126, 234, 0.05);
  border-left: 4px solid #667eea;
  border-radius: 8px;
  font-size: 0.95rem;
  color: var(--color-text, #333);
  line-height: 1.6;
}

.back-btn {
  display: block;
  margin: 40px auto 0;
  padding: 16px 32px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
}

.error-view {
  text-align: center;
  padding: 100px 20px;
}

.error-view h1 {
  font-size: 2.5rem;
  color: var(--color-text, #333);
  margin-bottom: 16px;
}

.error-view p {
  font-size: 1.2rem;
  color: var(--color-subtext, #666);
  margin-bottom: 30px;
}

@media (max-width: 768px) {
  .test-header {
    flex-direction: column;
  }

  .test-timer {
    width: 100%;
    justify-content: center;
  }

  .test-title {
    font-size: 1.4rem;
  }

  .controls {
    flex-direction: column;
  }

  .control-btn {
    width: 100%;
    justify-content: center;
  }

  .finish-btn {
    margin-left: 0;
    padding: 16px 32px;
  }

  .results-stats {
    gap: 20px;
  }

  .score-circle {
    width: 160px;
    height: 160px;
  }

  .score-percentage {
    font-size: 2.8rem;
  }

  .result-card {
    padding: 30px 20px;
  }

  .result-icon {
    width: 80px;
    height: 80px;
  }

  .result-icon svg {
    width: 40px;
    height: 40px;
  }

  .result-title {
    font-size: 1.6rem;
  }
}
</style>