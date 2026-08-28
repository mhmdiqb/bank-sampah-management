module.exports = (sequelize, DataTypes) => {
  const AuditLog = sequelize.define(
    'AuditLog',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      userId: { type: DataTypes.INTEGER, allowNull: true, field: 'user_id' },
      action: { type: DataTypes.STRING(50), allowNull: false },
      entity: { type: DataTypes.STRING(50), allowNull: false },
      entityId: { type: DataTypes.INTEGER, allowNull: true, field: 'entity_id' },
      oldData: { type: DataTypes.JSON, allowNull: true, field: 'old_data' },
      newData: { type: DataTypes.JSON, allowNull: true, field: 'new_data' },
      ipAddress: { type: DataTypes.STRING(45), allowNull: true, field: 'ip_address' },
      userAgent: { type: DataTypes.STRING(255), allowNull: true, field: 'user_agent' },
    },
    {
      tableName: 'audit_logs',
      underscored: true,
      timestamps: true,
      updatedAt: false,
      createdAt: 'created_at',
    }
  );

  return AuditLog;
};
