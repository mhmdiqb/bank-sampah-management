const ROLES = Object.freeze({
  ADMIN: 'admin',
  PETUGAS: 'petugas',
  NASABAH: 'nasabah',
});

const USER_ROLES = Object.values(ROLES);

const TRANSACTION_STATUS = Object.freeze({
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
});

const WITHDRAWAL_STATUS = Object.values(TRANSACTION_STATUS);

const AUDIT_ACTIONS = Object.freeze({
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  APPROVE: 'APPROVE',
  REJECT: 'REJECT',
});

module.exports = {
  ROLES,
  USER_ROLES,
  TRANSACTION_STATUS,
  WITHDRAWAL_STATUS,
  AUDIT_ACTIONS,
};
