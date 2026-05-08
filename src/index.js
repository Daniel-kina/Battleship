import './general.css';
import GameController from './battleshipController';
import Ship from './battleshipModel';

const controller = new GameController();
const shipPlayer = new Ship(3);
const shipOpponent = new Ship(3);
controller.startGame('Daniel', 'ERZFEIND', 'computer');
