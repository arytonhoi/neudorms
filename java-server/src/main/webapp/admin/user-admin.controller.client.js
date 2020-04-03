(function () {
    var userService = new UserService();
    var rowTemplate;
    var tbody;

    jQuery(main);
 
    // var $removeBtn, $editBtn, $createBtn;
    // var $userRowTemplate, $tbody;
    // var userService = new AdminUserServiceClient();

    var usernameFld, passwordFld, firstNameFld, lastNameFld, roleFld;
    var updateUserBtn;
    var selectedUserId;

    function createUser() {
        var username = usernameFld.val();
        var password = passwordFld.val();
        var firstName = firstNameFld.val();
        var lastName = lastNameFld.val();
        var role = roleFld.val();

        var user = {
            username: username,
            password: password,
            firstname: firstName,
            lastname: lastName,
            role: role
        }

        userService
            .createUser(user)
            .then((actualUser) => {
                findAllUsers()
            })
    }

    function renderUsers(users) {
        tbody.empty()
        for (var u in users) {
            const user = users[u];
            const rowClone = rowTemplate.clone();
            rowClone.removeClass('wbdv-hidden');
            rowClone.find('.wbdv-username').html(user.username);
            rowClone.find('.wbdv-first-name').html(user.firstname);
            rowClone.find('.wbdv-last-name').html(user.lastname);
            rowClone.find('.wbdv-role').html(user.role);
            rowClone.find('.wbdv-edit').click(() => selectUser(user));
            rowClone.find('.wbdv-remove').click(() => deleteUser(user._id));
            tbody.append(rowClone);
        }
    }

    function findAllUsers() {
        userService
            .findAllUsers()
            .then(users => {
                renderUsers(users)
            })
    }

    function selectUser(user) {
        // load user info into fields
        selectedUserId = user._id
        console.log("selected: " + selectedUserId)

        usernameFld.val(user.username) 
        passwordFld.val(user.password)
        firstNameFld.val(user.firstname)
        lastNameFld.val(user.lastname)
        roleFld.val(user.role)
    }

    function updateUser() {
        console.log("updating: " + selectedUserId)
        
        var user = {
            username: usernameFld.val(),
            password: passwordFld.val(),
            firstname: firstNameFld.val(),
            lastname: lastNameFld.val(),
            role: roleFld.val()
        }

        console.log(user)

        userService
            .updateUser(selectedUserId, user)
            .then((actualUser) => {
                findAllUsers()
            })
    }

    function findUserById(userId) {
        // not sure what to do here
    }

    function deleteUser(userId) {
        userService
            .deleteUser(userId)
            .then(() => {
                findAllUsers()
            })
    }
    
    function renderUser(user) {
        const rowClone = rowTemplate.clone();
        rowClone.removeClass('wbdv-hidden');
        rowClone.find('.wbdv-username').html(user.username);
        rowClone.find('.wbdv-first-name').html(user.firstname);
        rowClone.find('.wbdv-last-name').html(user.lastname);
        rowClone.find('.wbdv-role').html(user.role);
        rowClone.find('.wbdv-edit').click(() => selectUser(user));
        rowClone.find('.wbdv-remove').click(() => deleteUser(user._id));
        tbody.append(rowClone);
    }

    function main() {
        usernameFld = $('#usernameFld');
        passwordFld = $('#passwordFld');
        firstNameFld = $('#firstNameFld');
        lastNameFld = $('#lastNameFld');
        roleFld = $('#roleFld');

        rowTemplate = jQuery('.wbdv-template');
        createUserBtn = jQuery('.wbdv-create');
        updateUserBtn = jQuery('.wbdv-update');
        tbody = jQuery('tbody');

        createUserBtn.click(createUser);
        updateUserBtn.click(updateUser);

        userService
            .findAllUsers()
            .then(renderUsers)
    } 
})();
