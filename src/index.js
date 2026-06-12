// import ProjectManager from './modules/projectManager.js';

import AppController from './modules/AppController.js';

const app = new AppController();
const twm = app.createNewPm({
  projectName: 'TWM',
  description: 'Bulldog rat ass',
});
const lck = app.createNewPm({ projectName: 'LCK' });
const edsel = app.createNewPm({ projectName: 'Edsek' });

console.log(app.getAllPMs());
// console.log(app.getOnePm(lck.id));
// console.log(app.removePM(lck.id));
// console.log(app.getOnePm(twm.id));

// const pm = new ProjectManager(crypto.randomUUID(), 'TWM Project');
// pm.addTodo({
//   title: 'TWM go home early',
//   description: 'Take bag and zhao',
// });
// const toUpdate = pm.addTodo({
//   title: 'Go for meeting',
//   description: 'Bring LCK along',
// });

// pm.updateTodo(toUpdate.id, {
//   title: 'Change title',
// });

// console.log(pm.getAllTodos());
