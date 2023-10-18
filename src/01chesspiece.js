import React from 'react';
import orcIcon from '../src/css/icons/orc.png';
import goblin from '../src/css/icons/goblin.png';
import axe from '../src/css/icons/axe.png';
import wolf from '../src/css/icons/wolf.png';
import elf from '../src/css/icons/elf.png';
import lego from '../src/css/icons/lego.png';
import gandalf from '../src/css/icons/gandalf.png';
import frodo from '../src/css/icons/frodo.png';
import bat from '../src/css/icons/bat.png';
import knight from '../src/css/icons/knight.png';
import queen from '../src/css/icons/queen.png';
import demon from '../src/css/icons/demon.png';

import devil from '../src/css/icons/devil.png';
import ghost from '../src/css/icons/ghost.png';
import grail from '../src/css/icons/holy-grail.png';
import water from '../src/css/icons/holy-water.png';
import pope from '../src/css/icons/pope.png';
import angel from '../src/css/icons/power.png';
import soldier from '../src/css/icons/soldier.png';
import zombie from '../src/css/icons/zombie.png';
import tree from '../src/css/icons/tree.png';
import witch from '../src/css/icons/witch-hat.png';
import peace from '../src/css/icons/peace.png';
import skeleton from '../src/css/icons/skeleton.png';




const ChessPiece = ({ piece, design }) => {
  const pieceDesigns = {
    default: {
      'P': '♙',
      'N': '♘',
      'B': '♗',
      'R': '♖',
      'Q': '♕',
      'K': '♔',
      'p': '♟',
      'n': '♞',
      'b': '♝',
      'r': '♜',
      'q': '♛',
      'k': '♚',
      ' ': null,
    },
    alternate: {
      'P':<img src={elf} alt="Orc" />,
      'N': <img src={knight} alt="Orc" />,
      'B': <img src={lego} alt="Orc" />,
      'R': <img src={queen} alt="Orc" />,
      'Q': <img src={gandalf} alt="Orc" />,
      'K': <img src={frodo} alt="Orc" />,
      'p': <img src={orcIcon} alt="Orc" />,
      'n': <img src={bat} alt="Orc" />,
      'b': <img src={goblin} alt="Orc" />,
      'r': <img src={wolf} alt="Orc" />,
      'q': <img src={demon} alt="Orc" />,
      'k': <img src={axe} alt="Orc" />,
      ' ': null,
    },
    altAlt: {
      'P':<img src={soldier} alt="Orc" />,
      'N': <img src={water} alt="Orc" />,
      'B': <img src={pope} alt="Orc" />,
      'R': <img src={peace} alt="Orc" />,
      'Q': <img src={angel} alt="Orc" />,
      'K': <img src={grail} alt="Orc" />,
      'p': <img src={skeleton} alt="Orc" />,
      'n': <img src={zombie} alt="Orc" />,
      'b': <img src={ghost} alt="Orc" />,
      'r': <img src={tree} alt="Orc" />,
      'q': <img src={devil} alt="Orc" />,
      'k': <img src={witch} alt="Orc" />,
      ' ': null,
    },
  };

  return (
    <div className="chess-piece">
      {pieceDesigns[design][piece]}
    </div>
  );
};

export default ChessPiece;