import  express  from 'express';
import config from './config';
import cors from 'cors'
import { join } from 'path';

import activitiesRoutes from './routes/activities.routes';
import projectsRoutes from './routes/projects.routes';
import usersRoutes from './routes/users.routes'
import projectsHasUsers from './routes/projectsHasUsers.routes'
import profileRoutes from './routes/profile.routes'
import securityRoutes from './routes/security.routes'

const app = express();

app.set('port', config.port);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(activitiesRoutes);
app.use(projectsRoutes);
app.use(usersRoutes);
app.use(projectsHasUsers);
app.use(profileRoutes);
app.use(securityRoutes);
app.use('/api/themes', express.static(join(__dirname, "./assets/themes")));
app.use('/api/user-icon/full', express.static(join(__dirname, "./assets/user-icons/full")));
app.use('/api/user-icon/small', express.static(join(__dirname, "./assets/user-icons/small")));
app.use('/api/videos/', express.static(join(__dirname, "./assets/videos/")));


export default app;