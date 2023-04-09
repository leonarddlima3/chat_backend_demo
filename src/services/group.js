const db = require("../db/models");
const helperUtil = require('../helpers/utils');
const _ = require('lodash');

module.exports = {
    getGroups: function(req, resolve) {
        db.Group.findAll({})
            .then((data) => {
                resolve(null, data, 200, 'success');
            })
            .catch(err => {
                resolve(err, null, 500, 'fail');
            });
    },
    getGroupById: function(req, resolve) {
        const groupId = req.params.groupId;
        db.Group.findOne({
            where: {
                group_id: groupId
            }
        })
            .then((data) => {
                resolve(null, data, 200, 'success');
            })
            .catch(err => {
                resolve(err, null, 500, 'fail');
            });
    },
    createGroup: function(req, resolve) {
        const groupData = _.pick(req.body, [
            'group_name'
        ]);
        groupData.group_id = `group_${helperUtil.getUniqueId()}`;
        db.Group.create(groupData)
            .then((data) => {
                resolve(null, data, 201, 'success');
            })
            .catch(err => {
                resolve(err, null, 500, 'fail');
            });
    },
    updateGroup: function(req, resolve) {
        const groupId = req.params.groupId;
        const groupData = _.pick(req.body, [
            'group_name'
        ]);

        db.Group.update(groupData, {
            where: {
                group_id: groupId
            }
        })
            .then(() => {
                resolve(null, null, 204, 'success');
            })
            .catch(err => {
                resolve(err, null, 500, 'fail');
            });
    },
    addGroupMember: function(req, resolve) {
        const groupMemberData = _.pick(req.body, [
            'user_id'
        ]);
        groupMemberData.group_id = req.params.groupId;
        groupMemberData.gm_id = `gm_${helperUtil.getUniqueId()}`;
        db.GroupMember.create(groupMemberData)
            .then((data) => {
                resolve(null, data, 201, 'success');
            })
            .catch(err => {
                resolve(err, null, 500, 'fail');
            });
    },
    getGroupMembersByGroupId: function(req, resolve) {
        const groupId = req.params.groupId;
        db.GroupMember.findAll({
            where: {
                group_id: groupId
            }
        })
            .then((data) => {
                resolve(null, data, 200, 'success');
            })
            .catch(err => {
                resolve(err, null, 500, 'fail');
            });
    },
}