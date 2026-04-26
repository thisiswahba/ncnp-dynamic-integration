import { useEffect, useMemo, useState } from 'react';
import {
  Sheet,
  SheetContent,
} from '@/app/components/ui/sheet';
import { Button } from '@/app/components/ui/button';
import {
  ArrowRight,
  ChevronDown,
  Save,
  CheckCircle2,
  ClipboardCheck,
  BadgeCheck,
  Eye,
  Briefcase,
  FileSearch2,
  FileCheck2,
  Info,
  type LucideIcon,
} from 'lucide-react';
import { useLanguage } from '@/app/contexts/language-context';

interface BusinessRole {
  id: string;
  name: string;
  nameAr: string;
  icon: LucideIcon;
}

interface IdmRole {
  id: string;
  name: string;
}

const BUSINESS_ROLES: BusinessRole[] = [
  { id: 'r1', name: 'Execution Reviewer', nameAr: 'مراجع التنفيذ', icon: ClipboardCheck },
  { id: 'r2', name: 'Execution Approver', nameAr: 'معتمد التنفيذ', icon: BadgeCheck },
  { id: 'r3', name: 'Onsite Evaluation Supervisor', nameAr: 'مشرف التقييم الميداني', icon: Eye },
  { id: 'r4', name: 'Onsite Evaluation Manager', nameAr: 'مدير التقييم الميداني', icon: Briefcase },
  { id: 'r5', name: 'Corrective Action Evidence Reviewer', nameAr: 'مراجع أدلة الإجراءات التصحيحية', icon: FileSearch2 },
  { id: 'r6', name: 'Corrective Action Plan Approver', nameAr: 'معتمد خطة الإجراءات التصحيحية', icon: FileCheck2 },
];

const IDM_ROLES: IdmRole[] = [
  { id: 'idm-1', name: 'idm.execution.reviewer' },
  { id: 'idm-2', name: 'idm.execution.approver' },
  { id: 'idm-3', name: 'idm.onsite.supervisor' },
  { id: 'idm-4', name: 'idm.onsite.manager' },
  { id: 'idm-5', name: 'idm.corrective.reviewer' },
  { id: 'idm-6', name: 'idm.corrective.approver' },
  { id: 'idm-7', name: 'idm.audit.advisor' },
];

export interface UserGroupDraft {
  id?: string;
  name: string;
  mapping: Record<string, string>;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial?: UserGroupDraft | null;
  onSave: (draft: UserGroupDraft) => void;
}

export function UserGroupEditSheet({ open, onOpenChange, initial, onSave }: Props) {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  const isEditing = !!initial?.id;

  const [name, setName] = useState('');
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [justMapped, setJustMapped] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setName(initial?.name ?? '');
      setMapping(initial?.mapping ?? {});
      setJustMapped(null);
    }
  }, [open, initial]);

  const mappedCount = useMemo(
    () => BUSINESS_ROLES.filter((r) => !!mapping[r.id]).length,
    [mapping]
  );
  const totalRoles = BUSINESS_ROLES.length;
  const coverage = Math.round((mappedCount / totalRoles) * 100);
  const isComplete = mappedCount === totalRoles;

  const handleMap = (roleId: string, idmId: string) => {
    setMapping((prev) => {
      const next = { ...prev };
      if (idmId) next[roleId] = idmId;
      else delete next[roleId];
      return next;
    });
    if (idmId) {
      setJustMapped(roleId);
      window.setTimeout(() => setJustMapped(null), 600);
    }
  };

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({ id: initial?.id, name: name.trim(), mapping });
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={isRTL ? 'left' : 'right'}
        className="sm:max-w-[640px] w-full p-0 grid grid-rows-[auto_1fr_auto] gap-0"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-5 border-b border-border/60">
          <p
            className={`text-[10px] uppercase tracking-[0.12em] text-muted-foreground font-medium mb-1.5 ${isRTL ? 'text-right' : 'text-left'}`}
          >
            {t('userGroups.eyebrow')}
          </p>
          <h2
            className={`text-foreground ${isRTL ? 'text-right' : 'text-left'}`}
            style={{ fontSize: '22px', lineHeight: 1.2, fontWeight: 600, letterSpacing: '-0.01em' }}
          >
            {isEditing ? t('userGroups.edit.title') : t('userGroups.create.title')}
          </h2>
        </div>

        {/* Body */}
        <div className="overflow-y-auto">
          <div className="px-6 py-6 space-y-6">
            {/* Name input */}
            <div>
              <label
                className={`block mb-2 uppercase text-muted-foreground font-semibold ${isRTL ? 'text-right' : 'text-left'}`}
                style={{ fontSize: '10px', letterSpacing: '0.12em' }}
              >
                {t('userGroups.groupName')}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('userGroups.groupNamePlaceholder')}
                autoFocus
                className={`w-full h-11 bg-white border border-border/70 rounded-xl px-4 text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors ${isRTL ? 'text-right' : 'text-left'}`}
                style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
              />
            </div>

            {/* Coverage */}
            <div className="flex items-center gap-2">
              <span
                className="uppercase text-muted-foreground font-semibold"
                style={{ fontSize: '10px', letterSpacing: '0.12em' }}
              >
                {t('userGroups.coverage')}
              </span>
              <div className="flex-1 max-w-[280px] relative h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className={`absolute inset-y-0 ${isRTL ? 'right-0' : 'left-0'} bg-primary rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]`}
                  style={{ width: `${coverage}%` }}
                />
              </div>
              <span
                className="text-muted-foreground font-mono tabular-nums"
                style={{ fontSize: '11px' }}
                dir="ltr"
              >
                <span className="text-foreground font-semibold">{mappedCount}</span>/{totalRoles}
              </span>
              {isComplete && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
            </div>

            {/* Helper */}
            <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-50 border border-blue-100">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <p
                className={`text-blue-900 flex-1 ${isRTL ? 'text-right' : 'text-left'}`}
                style={{ fontSize: 'var(--text-xs)', lineHeight: 1.5 }}
              >
                {t('userGroups.mappingHelper')}
              </p>
            </div>

            {/* Mapping rows */}
            <div className="space-y-2">
              {BUSINESS_ROLES.map((role) => (
                <MappingRow
                  key={role.id}
                  role={role}
                  mapped={mapping[role.id] ?? ''}
                  idmOptions={IDM_ROLES}
                  onChange={(v) => handleMap(role.id, v)}
                  justMapped={justMapped === role.id}
                  isRTL={isRTL}
                  t={t}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`px-6 py-4 border-t border-border/60 bg-card/80 backdrop-blur-sm flex items-center justify-end gap-2`}
        >
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="h-9 px-4 font-medium"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            {t('userGroups.cancel')}
          </Button>
          <Button
            onClick={handleSave}
            disabled={!name.trim()}
            className="h-9 px-5 font-medium flex items-center gap-2"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            <Save className="w-4 h-4" />
            {isEditing ? t('userGroups.update') : t('userGroups.create')}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ── Mapping Row ───────────────────────────────────────────────────────────────

function MappingRow({
  role,
  mapped,
  idmOptions,
  onChange,
  justMapped,
  isRTL,
  t,
}: {
  role: BusinessRole;
  mapped: string;
  idmOptions: IdmRole[];
  onChange: (v: string) => void;
  justMapped: boolean;
  isRTL: boolean;
  t: (k: string) => string;
}) {
  const isMapped = !!mapped;
  const Icon = role.icon;

  const RoleCell = (
    <div className="flex items-center gap-3 min-w-0">
      <span
        className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
          isMapped ? 'bg-emerald-100 text-emerald-700' : 'bg-muted text-muted-foreground'
        }`}
      >
        <Icon className="w-5 h-5" />
      </span>
      <div className={`min-w-0 flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
        <p
          className="text-foreground truncate"
          style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
        >
          {role.name}
        </p>
        <p className="text-muted-foreground truncate" style={{ fontSize: '11px' }}>
          {role.nameAr}
        </p>
      </div>
    </div>
  );

  const BridgeCell = (
    <div className="relative flex items-center justify-center">
      <div
        className={`h-px w-10 transition-colors duration-300 ${
          isMapped ? 'bg-emerald-400' : 'bg-border'
        }`}
      />
      <div
        className={`absolute w-7 h-7 rounded-full border-2 bg-white flex items-center justify-center transition-all duration-300 ${
          isMapped ? 'border-emerald-400 scale-100' : 'border-border/60 border-dashed scale-95'
        }`}
      >
        <ArrowRight
          className={`w-3.5 h-3.5 transition-colors ${
            isMapped ? 'text-emerald-600' : 'text-muted-foreground'
          } ${isRTL ? '-scale-x-100' : ''}`}
        />
      </div>
    </div>
  );

  const DropdownCell = (
    <div className="relative">
      <select
        value={mapped}
        onChange={(e) => onChange(e.target.value)}
        dir="ltr"
        className={`w-full h-10 px-3 pr-9 rounded-lg bg-white font-mono appearance-none outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-left ${
          isMapped
            ? 'border border-emerald-200 text-emerald-900 focus:border-emerald-400'
            : 'border border-border text-muted-foreground'
        }`}
        style={{ fontSize: 'var(--text-xs)' }}
      >
        <option value="">{t('userGroups.selectIdm')}</option>
        {idmOptions.map((o) => (
          <option key={o.id} value={o.id}>
            {o.name}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute top-1/2 -translate-y-1/2 right-3 w-4 h-4 text-muted-foreground pointer-events-none" />
    </div>
  );

  return (
    <div
      data-just-mapped={justMapped ? 'true' : undefined}
      className={`grid grid-cols-[1fr_auto_1fr] items-center gap-4
                 rounded-xl border px-4 py-3 transition-all duration-200
                 data-[just-mapped=true]:animate-[pulse-ring_0.6s_ease-out]
                 ${
                   isMapped
                     ? 'bg-emerald-50/40 border-emerald-200/60 hover:bg-emerald-50/60'
                     : 'bg-muted/20 border-dashed border-border hover:bg-muted/40 hover:border-border'
                 }`}
    >
      {RoleCell}
      {BridgeCell}
      {DropdownCell}
    </div>
  );
}
