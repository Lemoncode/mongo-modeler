export interface Member {
  id: string;
  name: string;
  surname: string;
  urlLinkedin: string;
  image: string;
}

export const memberList: Member[] = [
  {
    id: '1',
    name: 'Teresa',
    surname: 'Milanés',
    urlLinkedin: 'https://www.linkedin.com/in/mteresamb/',
    image: './assets/teresa-milanes.jpeg',
  },
  {
    id: '2',
    name: 'Tony',
    surname: 'Torres',
    urlLinkedin: '',
    image: './assets/tony-torres.jpeg',
  },
  {
    id: '3',
    name: 'Alberto',
    surname: 'Santiago',
    urlLinkedin: 'https://www.linkedin.com/in/albertos2c/',
    image: './assets/alberto-santiago.png',
  },
  {
    id: '4',
    name: 'Verónica',
    surname: 'Camarzana',
    urlLinkedin: 'https://www.linkedin.com/in/veronicacamarzana/',
    image: './assets/veronica-camarzana.jpeg',
  },
  {
    id: '5',
    name: 'Marcos',
    surname: 'Apocada',
    urlLinkedin: 'https://www.linkedin.com/in/marcos-apodaca/',
    image: './assets/marcos-apocada.jpeg',
  },
  {
    id: '6',
    name: 'Abel',
    surname: 'de Tena',
    urlLinkedin: 'https://www.linkedin.com/in/abeldetena/',
    image: './assets/abel-de-tena.jpeg',
  },
  {
    id: '7',
    name: `Leticia`,
    surname: 'de la Osa',
    urlLinkedin: 'https://www.linkedin.com/in/deletidev/',
    image: './assets/leticia-de-la-osa.jpeg',
  },
];
