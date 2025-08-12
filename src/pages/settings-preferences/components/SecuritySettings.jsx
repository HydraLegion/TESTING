import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const SecuritySettings = ({ settings, onSettingChange, onResetSection }) => {
  const sessionTimeoutOptions = [
    { value: '15', label: '15 minutes' },
    { value: '30', label: '30 minutes' },
    { value: '60', label: '1 hour' },
    { value: '120', label: '2 hours' },
    { value: '240', label: '4 hours' },
    { value: '480', label: '8 hours' },
    { value: 'never', label: 'Never timeout' }
  ];

  const retentionPolicyOptions = [
    { value: '7', label: '7 days' },
    { value: '30', label: '30 days' },
    { value: '90', label: '90 days' },
    { value: '180', label: '6 months' },
    { value: '365', label: '1 year' },
    { value: 'forever', label: 'Keep forever' }
  ];

  const encryptionLevelOptions = [
    { value: 'basic', label: 'Basic (AES-128)' },
    { value: 'standard', label: 'Standard (AES-256)' },
    { value: 'high', label: 'High (AES-256 + RSA)' }
  ];

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Security Settings</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Configure security policies, data retention, and privacy controls
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="RotateCcw"
          iconPosition="left"
          onClick={() => onResetSection('security')}
          className="text-muted-foreground hover:text-foreground"
        >
          Reset Section
        </Button>
      </div>
      {/* Session Management */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="font-medium text-card-foreground mb-1">Session Management</h4>
            <p className="text-sm text-muted-foreground">
              Control user session behavior and timeout policies
            </p>
          </div>
          <Icon name="Clock" size={20} className="text-muted-foreground mt-1" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Session Timeout"
            description="Automatically log out after period of inactivity"
            options={sessionTimeoutOptions}
            value={settings?.sessionTimeout}
            onChange={(value) => onSettingChange('sessionTimeout', value)}
          />

          <Input
            label="Maximum Concurrent Sessions"
            type="number"
            description="Maximum number of active sessions per user"
            value={settings?.maxConcurrentSessions}
            onChange={(e) => onSettingChange('maxConcurrentSessions', parseInt(e?.target?.value))}
            min="1"
            max="10"
          />
        </div>

        <div className="mt-6 space-y-4">
          <Checkbox
            label="Remember login"
            description="Keep users logged in across browser sessions"
            checked={settings?.rememberLogin}
            onChange={(e) => onSettingChange('rememberLogin', e?.target?.checked)}
          />

          <Checkbox
            label="Require re-authentication for sensitive actions"
            description="Ask for password confirmation before critical operations"
            checked={settings?.requireReauth}
            onChange={(e) => onSettingChange('requireReauth', e?.target?.checked)}
          />

          <Checkbox
            label="Log session activity"
            description="Keep detailed logs of user sessions and actions"
            checked={settings?.logSessionActivity}
            onChange={(e) => onSettingChange('logSessionActivity', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Data Privacy */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="font-medium text-card-foreground mb-1">Data Privacy Controls</h4>
            <p className="text-sm text-muted-foreground">
              Manage how personal and sensitive data is handled
            </p>
          </div>
          <Icon name="Shield" size={20} className="text-muted-foreground mt-1" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="File Retention Policy"
            description="How long to keep uploaded files"
            options={retentionPolicyOptions}
            value={settings?.fileRetentionPolicy}
            onChange={(value) => onSettingChange('fileRetentionPolicy', value)}
          />

          <Select
            label="Data Encryption Level"
            description="Encryption strength for stored data"
            options={encryptionLevelOptions}
            value={settings?.encryptionLevel}
            onChange={(value) => onSettingChange('encryptionLevel', value)}
          />
        </div>

        <div className="mt-6 space-y-4">
          <Checkbox
            label="Anonymize exported data"
            description="Remove or mask personally identifiable information in exports"
            checked={settings?.anonymizeExports}
            onChange={(e) => onSettingChange('anonymizeExports', e?.target?.checked)}
          />

          <Checkbox
            label="Secure file deletion"
            description="Use secure deletion methods to prevent data recovery"
            checked={settings?.secureFileDeletion}
            onChange={(e) => onSettingChange('secureFileDeletion', e?.target?.checked)}
          />

          <Checkbox
            label="Encrypt files at rest"
            description="Encrypt stored files using strong encryption"
            checked={settings?.encryptFilesAtRest}
            onChange={(e) => onSettingChange('encryptFilesAtRest', e?.target?.checked)}
          />

          <Checkbox
            label="Enable data loss prevention"
            description="Monitor and prevent unauthorized data access or export"
            checked={settings?.enableDLP}
            onChange={(e) => onSettingChange('enableDLP', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Access Control */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="font-medium text-card-foreground mb-1">Access Control</h4>
            <p className="text-sm text-muted-foreground">
              Configure user permissions and access restrictions
            </p>
          </div>
          <Icon name="Lock" size={20} className="text-muted-foreground mt-1" />
        </div>

        <div className="space-y-4">
          <Checkbox
            label="Enable two-factor authentication"
            description="Require additional verification for account access"
            checked={settings?.enableTwoFactor}
            onChange={(e) => onSettingChange('enableTwoFactor', e?.target?.checked)}
          />

          <Checkbox
            label="Restrict file upload by IP"
            description="Only allow uploads from specific IP addresses"
            checked={settings?.restrictUploadByIP}
            onChange={(e) => onSettingChange('restrictUploadByIP', e?.target?.checked)}
          />

          <Checkbox
            label="Require strong passwords"
            description="Enforce complex password requirements"
            checked={settings?.requireStrongPasswords}
            onChange={(e) => onSettingChange('requireStrongPasswords', e?.target?.checked)}
          />

          <Checkbox
            label="Enable account lockout"
            description="Lock accounts after multiple failed login attempts"
            checked={settings?.enableAccountLockout}
            onChange={(e) => onSettingChange('enableAccountLockout', e?.target?.checked)}
          />
        </div>

        {settings?.enableAccountLockout && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted rounded-md">
            <Input
              label="Failed Attempts Threshold"
              type="number"
              description="Number of failed attempts before lockout"
              value={settings?.lockoutThreshold}
              onChange={(e) => onSettingChange('lockoutThreshold', parseInt(e?.target?.value))}
              min="3"
              max="10"
            />

            <Input
              label="Lockout Duration (minutes)"
              type="number"
              description="How long to lock the account"
              value={settings?.lockoutDuration}
              onChange={(e) => onSettingChange('lockoutDuration', parseInt(e?.target?.value))}
              min="5"
              max="1440"
            />
          </div>
        )}
      </div>
      {/* Audit & Compliance */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="font-medium text-card-foreground mb-1">Audit & Compliance</h4>
            <p className="text-sm text-muted-foreground">
              Configure logging and compliance features
            </p>
          </div>
          <Icon name="FileCheck" size={20} className="text-muted-foreground mt-1" />
        </div>

        <div className="space-y-4">
          <Checkbox
            label="Enable audit logging"
            description="Keep detailed logs of all user actions and system events"
            checked={settings?.enableAuditLogging}
            onChange={(e) => onSettingChange('enableAuditLogging', e?.target?.checked)}
          />

          <Checkbox
            label="Log data access"
            description="Record when users view or download sensitive data"
            checked={settings?.logDataAccess}
            onChange={(e) => onSettingChange('logDataAccess', e?.target?.checked)}
          />

          <Checkbox
            label="Enable compliance reporting"
            description="Generate reports for regulatory compliance requirements"
            checked={settings?.enableComplianceReporting}
            onChange={(e) => onSettingChange('enableComplianceReporting', e?.target?.checked)}
          />

          <Checkbox
            label="Monitor file integrity"
            description="Check for unauthorized modifications to uploaded files"
            checked={settings?.monitorFileIntegrity}
            onChange={(e) => onSettingChange('monitorFileIntegrity', e?.target?.checked)}
          />
        </div>
      </div>
      {/* SSL & Encryption Status */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="font-medium text-card-foreground mb-1">Security Status</h4>
            <p className="text-sm text-muted-foreground">
              Current security configuration and trust indicators
            </p>
          </div>
          <Icon name="ShieldCheck" size={20} className="text-success mt-1" />
        </div>

        <div className="space-y-4">
          {/* SSL Status */}
          <div className="flex items-center justify-between p-4 bg-success/10 border border-success/20 rounded-md">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-success/20 rounded-lg">
                <Icon name="Lock" size={20} className="text-success" />
              </div>
              <div>
                <div className="font-medium text-success">SSL Certificate Active</div>
                <p className="text-sm text-success/80">
                  Your connection is secured with 256-bit encryption
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={20} className="text-success" />
              <span className="text-sm font-medium text-success">Verified</span>
            </div>
          </div>

          {/* Data Privacy Compliance */}
          <div className="flex items-center justify-between p-4 bg-primary/10 border border-primary/20 rounded-md">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/20 rounded-lg">
                <Icon name="Shield" size={20} className="text-primary" />
              </div>
              <div>
                <div className="font-medium text-primary">GDPR Compliant</div>
                <p className="text-sm text-primary/80">
                  Data handling meets European privacy standards
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={20} className="text-primary" />
              <span className="text-sm font-medium text-primary">Active</span>
            </div>
          </div>

          {/* Security Scan Status */}
          <div className="flex items-center justify-between p-4 bg-accent/10 border border-accent/20 rounded-md">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-accent/20 rounded-lg">
                <Icon name="Scan" size={20} className="text-accent" />
              </div>
              <div>
                <div className="font-medium text-accent">Security Scan</div>
                <p className="text-sm text-accent/80">
                  Last security scan completed: January 3, 2025
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={20} className="text-accent" />
              <span className="text-sm font-medium text-accent">Clean</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;