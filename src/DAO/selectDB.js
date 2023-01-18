
const cambiarBase = process.argv[6] || 'txt'

let chatDao;

switch (cambiarBase) {
    case 'txt':
        const { ContenedorArchivo } = await import('../persistence/containers/ContenedorArchivo.js');
        chatDao = new ContenedorArchivo('chat.txt');
        break;
    case 'firebase':
        const { ContenedorFirebase } = await import('../persistence/containers/ContenedorFirebase.js');
        chatDao = new ContenedorFirebase('chat');
        break;
    case 'mongo':
        const { default: ChatDaoMongo } = await import('./ChatDaoMongo.js')
        chatDao = new ChatDaoMongo();
        break;
    default:
        // do nothing;           
        break
}

class ChatsDaoFactory {
    static getDao() {
        return chatDao
    }
}

export default ChatsDaoFactory;