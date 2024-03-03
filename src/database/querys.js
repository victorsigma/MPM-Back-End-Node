export const querys = {
    getProjects: 
    `SELECT p.*
    FROM projects p JOIN projectshasusers pu ON p.id = pu.proyectsIdProject
        JOIN users u ON u.userId = pu.userIdUser
    WHERE u.userId = ?`,
    getActivities: 'SELECT * FROM activities WHERE projectId = ? AND ?? = ?',
    getActivitiesStatus: 'SELECT * FROM activities WHERE projectId = ? AND status = ? AND ?? = ?',
    getActivitiesStatusTypes: 'SELECT * FROM activitystatus',
    getProjectsHasUsers: 
    `SELECT u.userName, u.userIcon, r.rolName
    FROM projectshasusers pu JOIN users u ON u.userId = pu.userIdUser JOIN rols r ON r.Id = pu.idRol
    WHERE pu.proyectsIdProject = ?
    ORDER BY pu.idRol;`,
    getUsers: 'SELECT * FROM users',
    getRol: 'SELECT rolName	FROM rols WHERE Id = ?',
    getIcons: 'SELECT id, iconName FROM usericons ORDER BY iconName ASC;',
    getThemes: 'SELECT Id, themeName, themeType FROM themes',
    getTheme: 'SELECT themeType FROM themes WHERE Id = ?',

    setProject: 'INSERT INTO projects SET id = ?, title = ?, subtitle = ?, src = ?, dateStart = ?, dateEnd = ?, owner = ?',
    setActivity: 'INSERT INTO activities SET id = ?, title = ?, subtitle = ?, src = ?, status = ?, dateEnd = ?, leader = ?, analyst = ?, designer = ?, programmer = ?, projectId = ?',
    setProjectHasUser: 'INSERT INTO projectshasusers SET proyectsIdProject = ?, userIdUser = ?, idRol = ?',
    setUser: 'INSERT INTO users SET userId = ?, userName = ?, password = ?, userMail = ?, phoneNumber = ?',

    getLastProjectsHasUsers: 'SELECT * FROM projectshasusers ORDER BY Id DESC LIMIT 1',

    getProjectById: 
    `SELECT p.*
    FROM projects p JOIN projectshasusers pu ON p.id = pu.proyectsIdProject
        JOIN users u ON u.userId = pu.userIdUser
    WHERE u.userId = ? AND p.id = ?`,

    getProjectUserRol: 
    `SELECT pu.idRol
    FROM projects p JOIN projectshasusers pu ON p.id = pu.proyectsIdProject
        JOIN users u ON u.userId = pu.userIdUser
    WHERE u.userId = ? AND p.id = ?`,

    getActivityById: 'SELECT * FROM activities WHERE id = ?',
    getProjectHasUserById: 'SELECT * FROM projectshasusers WHERE Id = ?',
    getUserById: 'SELECT * FROM users WHERE userId = ?',

    deleteProject: 'DELETE FROM projects WHERE id = ?',
    deleteActivity: 'DELETE FROM activities WHERE id = ?',
    deleteProjectHasUser: 'DELETE FROM projectshasusers WHERE userIdUser = ? AND proyectsIdProject = ?',
    deleteUser: 'DELETE FROM users WHERE userId = ?',

    updateProject: 
    `UPDATE projects
        SET title = ?, 
        subtitle = ?,
        src = ?,
        dateEnd = ?
    WHERE id = ?`,

    updateActivity: 
    `UPDATE activities
        SET title = ?, 
        subtitle = ?,
        src = ?,
        status = ?,
        dateEnd = ?,
        leader = ?,
        analyst = ?,
        designer = ?,
        programmer = ?,
        projectId = ?
    WHERE id = ?`,

    updateProjectHasUser: 
    `UPDATE projectshasusers
        SET proyectsIdProject = ?, 
        userIdUser = ?,
        rolesIdRol = ?
    WHERE Id = ?`,

    updateUser: 
    `UPDATE users
        SET userName = ?, 
        password = ?,
        userMail = ?,
        phoneNumber = ?
    WHERE userId = ?`,

    updateUserTheme: 
    `UPDATE users
        SET selectedTheme = ?
    WHERE userId = ?`,
    updateUserIcon: 
    `UPDATE users
        SET userIcon = ?
    WHERE userId = ?`,

    checkEmail: 'SELECT * FROM users WHERE userMail = ?',
    checkUserName: 'SELECT * FROM users WHERE userName = ?',
    checkPhoneNumber: 'SELECT * FROM users WHERE phoneNumber = ?',

    checkRol: 'SELECT * FROM projectshasusers WHERE userIdUser = ? AND proyectsIdProject = ?'
}


    //export const querys = {
    //     getProjects: 'SELECT * FROM Projects',
    //     getActivities: 'SELECT * FROM Activities',
    //     getProjectsHasUsers: 'SELECT * FROM ProjectsHasUsers',
    //     getUsers: 'SELECT * FROM Users',
    
    //     setProject: 'INSERT INTO Projects VALUES (@id, @title, @subtitle, @src, @dateStart, @dateEnd)',
    //     setActivity: 'INSERT INTO Activities VALUES (@id, @title, @subtitle, @src, @status, @dateEnd, @Leader, @Analyst, @Designer, @Programmer, @projectId)',
    //     setProjectHasUser: 'INSERT INTO ProjectsHasUsers(proyectsIdProject, userIdUser, rolesIdRol ) VALUES (@proyectsIdProject, @userIdUser, @rolesIdRol)',
    //     setUser: 'INSERT INTO Users VALUES (@userId, @userName, @password, @userMail, @phoneNumber)',
    
    //     getLastProjectsHasUsers: 'SELECT TOP 1 * FROM ProjectsHasUsers ORDER BY Id DESC',
    
    
    //     getProjectById: 'SELECT * FROM Projects WHERE id = @id',
    //     getActivityById: 'SELECT * FROM Activities WHERE id = @id',
    //     getProjectHasUserById: 'SELECT * FROM ProjectsHasUsers WHERE Id = @id',
    //     getUserById: 'SELECT * FROM Users WHERE userId = @id',
    
    
    //     deleteProject: 'DELETE FROM Projects WHERE id = @id',
    //     deleteActivity: 'DELETE FROM Activities WHERE id = @id',
    //     deleteProjectHasUser: 'DELETE FROM ProjectsHasUsers WHERE Id = @id',
    //     deleteUser: 'DELETE FROM Users WHERE userId = @id',
    
    //     updateProject: 
    //     `UPDATE Projects
    //         Set title = @title, 
    //         subtitle = @subtitle,
    //         src = @src,
    //         dateEnd = @dateEnd
    //     WHERE id = @Id`,
    
    //     updateActivity: 
    //     `UPDATE Activities
    //         Set title = @title, 
    //         subtitle = @subtitle,
    //         src = @src,
    //         status = @status,
    //         dateEnd = @dateEnd,
    //         leader = @Leader,
    //         analyst = @Analyst,
    //         designer = @Designer,
    //         programmer = @Programmer,
    //         projectId = @projectId
    //     WHERE id = @Id`,
    
    //     updateProjectHasUser: 
    //     `UPDATE ProjectsHasUsers
    //         Set proyectsIdProject = @proyectsIdProject, 
    //         userIdUser = @userIdUser,
    //         rolesIdRol = @rolesIdRol
    //     WHERE Id = @id`,
    
    //     updateUser: 
    //     `UPDATE Users
    //         Set userName = @userName, 
    //         password = @password,
    //         userMail = @userMail,
    //         phoneNumber = @phoneNumber
    //     WHERE userId = @id`,
    
    
    //     checkEmail: 'SELECT * FROM Users WHERE userMail = ?',
    //     checkUserName: 'SELECT * FROM Users WHERE userName = ?',
    //     checkPhoneNumber: 'SELECT * FROM Users WHERE phoneNumber = ?',
    // }

/*
export const querys = {
    getProjects: 
    `SELECT p.*
    FROM projects p JOIN projectsHasUsers pu ON p.id = pu.proyectsIdProject
        JOIN users u ON u.userId = pu.userIdUser
    WHERE u.userId = ?`,
    getActivities: 'SELECT * FROM Activities WHERE projectId = ? AND ?? = ?',
    getActivitiesStatus: 'SELECT * FROM Activities WHERE projectId = ? AND status = ? AND ?? = ?',
    getActivitiesStatusTypes: 'SELECT * FROM ActivityStatus',
    getProjectsHasUsers: 
    `SELECT u.userName, u.userIcon, r.rolName
    FROM ProjectsHasUsers pu JOIN users u ON u.userId = pu.userIdUser JOIN rols r ON r.Id = pu.idRol
    WHERE pu.proyectsIdProject = ?
    ORDER BY pu.idRol;`,
    getUsers: 'SELECT * FROM Users',
    getRol: 'SELECT rolName	FROM Rols WHERE Id = ?',

    setProject: 'INSERT INTO Projects SET id = ?, title = ?, subtitle = ?, src = ?, dateStart = ?, dateEnd = ?, owner = ?',
    setActivity: 'INSERT INTO Activities SET id = ?, title = ?, subtitle = ?, src = ?, status = ?, dateEnd = ?, leader = ?, analyst = ?, designer = ?, programmer = ?, projectId = ?',
    setProjectHasUser: 'INSERT INTO ProjectsHasUsers SET proyectsIdProject = ?, userIdUser = ?, idRol = ?',
    setUser: 'INSERT INTO Users SET userId = ?, userName = ?, password = ?, userMail = ?, phoneNumber = ?',

    getLastProjectsHasUsers: 'SELECT * FROM ProjectsHasUsers ORDER BY Id DESC LIMIT 1',

    getProjectById: 
    `SELECT p.*
    FROM projects p JOIN projectsHasUsers pu ON p.id = pu.proyectsIdProject
        JOIN users u ON u.userId = pu.userIdUser
    WHERE u.userId = ? AND p.id = ?`,

    getProjectUserRol: 
    `SELECT pu.idRol
    FROM projects p JOIN projectsHasUsers pu ON p.id = pu.proyectsIdProject
        JOIN users u ON u.userId = pu.userIdUser
    WHERE u.userId = ? AND p.id = ?`,

    getActivityById: 'SELECT * FROM Activities WHERE id = ?',
    getProjectHasUserById: 'SELECT * FROM ProjectsHasUsers WHERE Id = ?',
    getUserById: 'SELECT * FROM Users WHERE userId = ?',

    deleteProject: 'DELETE FROM Projects WHERE id = ?',
    deleteActivity: 'DELETE FROM Activities WHERE id = ?',
    deleteProjectHasUser: 'DELETE FROM ProjectsHasUsers WHERE userIdUser = ? AND proyectsIdProject = ?',
    deleteUser: 'DELETE FROM Users WHERE userId = ?',

    updateProject: 
    `UPDATE Projects
        SET title = ?, 
        subtitle = ?,
        src = ?,
        dateEnd = ?
    WHERE id = ?`,

    updateActivity: 
    `UPDATE Activities
        SET title = ?, 
        subtitle = ?,
        src = ?,
        status = ?,
        dateEnd = ?,
        leader = ?,
        analyst = ?,
        designer = ?,
        programmer = ?,
        projectId = ?
    WHERE id = ?`,

    updateProjectHasUser: 
    `UPDATE ProjectsHasUsers
        SET proyectsIdProject = ?, 
        userIdUser = ?,
        rolesIdRol = ?
    WHERE Id = ?`,

    updateUser: 
    `UPDATE Users
        SET userName = ?, 
        password = ?,
        userMail = ?,
        phoneNumber = ?
    WHERE userId = ?`,

    checkEmail: 'SELECT * FROM Users WHERE userMail = ?',
    checkUserName: 'SELECT * FROM Users WHERE userName = ?',
    checkPhoneNumber: 'SELECT * FROM Users WHERE phoneNumber = ?',

    checkRol: 'SELECT * FROM projectsHasUsers WHERE userIdUser = ? AND proyectsIdProject = ?'
}

*/