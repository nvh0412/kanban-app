import NoteStore from '../../stores/NoteStore';
import storage from '../../libs/storage';
import persist from '../../libs/persist';

export default alt => {
  alt.addStore('NoteStore', NoteStore);
  persist(alt, storage(localStorage), 'app');
}
