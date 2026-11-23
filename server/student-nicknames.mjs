// Apelidos sem dados pessoais. O código continua compatível com os acessos antigos.
const firstWords = [
  'Acácia', 'Ágata', 'Águia', 'Alba', 'Alce', 'Alga', 'Aloe', 'Amora',
  'Anis', 'Arara', 'Arco', 'Aroeira', 'Áster', 'Atlas', 'Aurora', 'Avelã',
  'Azulão', 'Bambu', 'Boreal', 'Brisa', 'Búzio', 'Cacau', 'Cacto', 'Canela',
  'Capim', 'Castor', 'Cedro', 'Cereja', 'Cervo', 'Cipó', 'Cisne', 'Colibri',
  'Coral', 'Cosmos', 'Cristal', 'Dália', 'Delfim', 'Duna', 'Elora', 'Estrela',
  'Falcão', 'Farol', 'Fauna', 'Fênix', 'Flora', 'Floresta', 'Floco', 'Flor',
  'Fonte', 'Gaia', 'Galadriela', 'Garoa', 'Geada', 'Gema', 'Girassol', 'Hera',
  'Íbis', 'Íris', 'Jade', 'Jaguatirica', 'Jasmim', 'Jatobá', 'Juno', 'Kiwi',
  'Lago', 'Laranja', 'Lavanda', 'Lince', 'Lótus', 'Lua', 'Lume', 'Luna',
  'Luz', 'Magnólia', 'Mar', 'Maré', 'Mel', 'Menta', 'Mirtilo', 'Musgo',
  'Néctar', 'Nimbo', 'Ninfa', 'Nuvem', 'Oliva', 'Ônix', 'Órion', 'Orvalho',
  'Panda', 'Pérola', 'Petúnia', 'Pinha', 'Pitaya', 'Pólen', 'Puma', 'Quartzo',
  'Raio', 'Raposa', 'Riacho', 'Rio', 'Rosa', 'Rubi', 'Safira', 'Sálvia',
  'Samba', 'Semente', 'Serena', 'Sol', 'Sombra', 'Tamarino', 'Terra', 'Tília',
  'Topázio', 'Trevo', 'Tulipa', 'Turmalina', 'Ursa', 'Vale', 'Vega', 'Vento',
  'Vereda', 'Violeta', 'Vitória', 'Zênite',
];
const lastWords = [
  'Alvorada', 'Anil', 'Arco', 'Astral', 'Aventura', 'Azul', 'Boreal', 'Brisa',
  'Céu', 'Cintila', 'Clara', 'Coral', 'Cosmos', 'Cristal', 'Dourada', 'Duna',
  'Eco', 'Esmeralda', 'Estelar', 'Estrela', 'Flora', 'Flor', 'Geada', 'Horizonte',
  'Íris', 'Jade', 'Lago', 'Leste', 'Livre', 'Lua', 'Luar', 'Lume',
  'Lunar', 'Luz', 'Mar', 'Maré', 'Mel', 'Norte', 'Nova', 'Nuvem',
  'Oliva', 'Orvalho', 'Pérola', 'Pico', 'Pólen', 'Prata', 'Primavera', 'Raio',
  'Rio', 'Rubi', 'Safira', 'Serena', 'Serra', 'Silvestre', 'Sol', 'Solar',
  'Sul', 'Terra', 'Trilha', 'Turquesa', 'Vale', 'Vento', 'Verde', 'Viva',
];
const letters = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-zA-Z]/g, '').toUpperCase();

// Reservam-se cinco posições para o maior número de turma permitido.
export const nicknamePool = Object.freeze(firstWords.flatMap(first => lastWords
  .filter(last => letters(first) !== letters(last) && letters(first + last).length <= 15)
  .map(last => Object.freeze({ nickname: first + ' ' + last, stem: letters(first + last) }))));

function randomIndex(length) {
  const range = 0x100000000;
  const ceiling = range - range % length;
  const buffer = new Uint32Array(1);
  do { crypto.getRandomValues(buffer); } while (buffer[0] >= ceiling);
  return buffer[0] % length;
}

export function generatedStudentIdentity(classNumber) {
  if (typeof classNumber !== 'string' || !/^[0-9]{1,5}$/.test(classNumber)) {
    throw new TypeError('Número de turma inválido.');
  }
  const item = nicknamePool[randomIndex(nicknamePool.length)];
  return { nickname: item.nickname, code: item.stem + classNumber };
}
