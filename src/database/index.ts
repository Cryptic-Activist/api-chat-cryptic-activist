import connection from '../config/database';

import Language from '../models/Language/Language';
import User from '../models/User/User';

User.init(connection);
Language.init(connection);

User.associate(connection.models);
Language.associate(connection.models);

export default connection;
