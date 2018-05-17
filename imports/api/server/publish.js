Meteor.publish('Transactions', () => {

    return Transactions.find({},{sort:{Date:1}});
});
Meteor.publish("myuser",
    function () {
        return Meteor.users.find(this.userId,
            {fields: {username: 1}});
    }
);