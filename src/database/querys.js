export const querys = {
    getProjects: 'SELECT * FROM Projects',
    getActivities: 'SELECT * FROM Activities',
    getProjectsHasUsers: 'SELECT * FROM ProjectsHasUsers',
    getUsers: 'SELECT * FROM Users',

    setProject: 'INSERT INTO Projects VALUES (@id, @title, @subtitle, @src, @dateStart, @dateEnd)',
    setActivity: 'INSERT INTO Activities VALUES (@id, @title, @subtitle, @src, @status, @dateEnd, @Leader, @Analyst, @Designer, @Programmer, @projectId)',
    setProjectHasUser: 'INSERT INTO ProjectsHasUsers(proyectsIdProject, userIdUser, rolesIdRol ) VALUES (@proyectsIdProject, @userIdUser, @rolesIdRol)',
    setUser: 'INSERT INTO Users VALUES (@userId, @userName, @password, @userMail, @phoneNumber)',

    getLastProjectsHasUsers: 'SELECT TOP 1 * FROM ProjectsHasUsers ORDER BY Id DESC',


    getProjectById: 'SELECT * FROM Projects WHERE id = @id',
    getActivityById: 'SELECT * FROM Activities WHERE id = @id',
    getProjectHasUserById: 'SELECT * FROM ProjectsHasUsers WHERE Id = @id',
    getUserById: 'SELECT * FROM Users WHERE userId = @id',


    deleteProject: 'DELETE FROM Projects WHERE id = @id',
    deleteActivity: 'DELETE FROM Activities WHERE id = @id',
    deleteProjectHasUser: 'DELETE FROM ProjectsHasUsers WHERE Id = @id',
    deleteUser: 'DELETE FROM Users WHERE userId = @id',

    updateProject: 
    `UPDATE Projects
        Set title = @title, 
        subtitle = @subtitle,
        src = @src,
        dateEnd = @dateEnd
    WHERE id = @Id`,

    updateActivity: 
    `UPDATE Activities
        Set title = @title, 
        subtitle = @subtitle,
        src = @src,
        status = @status,
        dateEnd = @dateEnd,
        leader = @Leader,
        analyst = @Analyst,
        designer = @Designer,
        programmer = @Programmer,
        projectId = @projectId
    WHERE id = @Id`,

    updateProjectHasUser: 
    `UPDATE ProjectsHasUsers
        Set proyectsIdProject = @proyectsIdProject, 
        userIdUser = @userIdUser,
        rolesIdRol = @rolesIdRol
    WHERE Id = @id`,

    updateUser: 
    `UPDATE Users
        Set userName = @userName, 
        password = @password,
        userMail = @userMail,
        phoneNumber = @phoneNumber
    WHERE userId = @id`,
}