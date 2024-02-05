import leticia from '/members/leticia.jpeg';

export interface Member {
  id: string;
  name: string;
  urlLinkedin: string;
  image: string;
}

export const memberList: Member[] = [
  {
    id: '1',
    name: 'Leticia de la Osa',
    urlLinkedin: 'https://www.linkedin.com/in/deletidev/',
    image: leticia,
  },
  {
    id: '2',
    name: 'Leticia de la Osa',
    urlLinkedin: 'https://www.linkedin.com/in/deletidev/',
    image: leticia,
  },
  {
    id: '3',
    name: 'Leticia de la Osa',
    urlLinkedin: 'https://www.linkedin.com/in/deletidev/',
    image: leticia,
  },
  {
    id: '4',
    name: 'Leticia de la Osa',
    urlLinkedin: 'https://www.linkedin.com/in/deletidev/',
    image: leticia,
  },
];
