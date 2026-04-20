import { useState } from 'react';
import {
  Plus,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Trash2,
  ClipboardCheck,
  BadgeCheck,
  Eye,
  Briefcase,
  FileSearch2,
  FileCheck2,
  CheckCircle2,
  Info,
  UsersRound,
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
  description: string;
}

interface UserGroup {
  id: string;
  name: string;
  mapping: Record<string, string>;
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
  { id: 'idm-1', name: 'idm.execution.reviewer', description: 'Execution review access' },
  { id: 'idm-2', name: 'idm.execution.approver', description: 'Execution approval rights' },
  { id: 'idm-3', name: 'idm.onsite.supervisor', description: 'Field supervision' },
  { id: 'idm-4', name: 'idm.onsite.manager', description: 'Field management' },
  { id: 'idm-5', name: 'idm.corrective.reviewer', description: 'Corrective action review' },
  { id: 'idm-6', name: 'idm.corrective.approver', description: 'Corrective action approval' },
  { id: 'idm-7', name: 'idm.audit.advisor', description: 'External audit advisor' },
];

const initialGroups: UserGroup[] = [
  {
    id: 'g1',
    name: 'Compliance Team',
    mapping: { r1: 'idm-1', r2: 'idm-2', r3: 'idm-3', r4: 'idm-4' },
  },
];

export function UserGroupsPage() {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';

  const [groups, setGroups] = useState<UserGroup[]>(initialGroups);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(initialGroups.map((g) => g.id)));
  const [justMapped, setJustMapped] = useState<string | null>(null);

  const addGroup = () => {
    const newId = `g${Date.now()}`;
    setGroups((prev) => [...prev, { id: newId, name: '', mapping: {} }]);
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.add(newId);
      return next;
    });
  };

  const deleteGroup = (id: string) => {
    setGroups((prev) => prev.filter((g) => g.id !== id));
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const updateName = (id: string, name: string) => {
    setGroups((prev) => prev.map((g) => (g.id === id ? { ...g, name } : g)));
  };

  const updateMapping = (groupId: string, roleId: string, idmId: string) => {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id !== groupId) return g;
        const nextMapping = { ...g.mapping };
        if (idmId) nextMapping[roleId] = idmId;
        else delete nextMapping[roleId];
        return { ...g, mapping: nextMapping };
      })
    );
    if (idmId) {
      const key = `${groupId}:${roleId}`;
      setJustMapped(key);
      window.setTimeout(() => setJustMapped(null), 600);
    }
  };

  return (
    <div className="px-8 py-6 max-w-7xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className={`mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
        <p
          className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground font-medium mb-1"
        >
          {t('userGroups.eyebrow')}
        </p>
        <h1
          className="text-foreground"
          style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, letterSpacing: '-0.01em' }}
        >
          {t('userGroups.title')}
        </h1>
        <p className="text-muted-foreground mt-1" style={{ fontSize: 'var(--text-sm)' }}>
          {t('userGroups.subtitle')}
        </p>
      </div>

      {/* Helper banner */}
      <div className="flex items-start gap-2 p-3 mb-6 rounded-lg bg-blue-50 border border-blue-100">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <p
          className={`text-blue-900 flex-1 ${isRTL ? 'text-right' : 'text-left'}`}
          style={{ fontSize: 'var(--text-xs)', lineHeight: 1.5 }}
        >
          {t('userGroups.pageHelper')}
        </p>
      </div>

      {/* Groups OR Empty state */}
      {groups.length > 0 ? (
        <>
          <div className="space-y-4">
            {groups.map((group, idx) => (
              <GroupCard
                key={group.id}
                group={group}
                index={idx}
                expanded={expandedIds.has(group.id)}
                onToggle={() => toggleExpand(group.id)}
                onDelete={() => deleteGroup(group.id)}
                onNameChange={(n) => updateName(group.id, n)}
                onMappingChange={(roleId, idmId) => updateMapping(group.id, roleId, idmId)}
                justMapped={justMapped}
                isRTL={isRTL}
                t={t}
              />
            ))}
          </div>

          {/* Add Group CTA */}
          <button
            type="button"
            onClick={addGroup}
            className="w-full mt-4 py-4 rounded-2xl border border-dashed border-border bg-white hover:border-primary/40 hover:bg-primary/5 transition-all flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground"
            style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
          >
            <Plus className="w-4 h-4" />
            {t('userGroups.createNew')}
          </button>
        </>
      ) : (
        <EmptyState onCreate={addGroup} t={t} />
      )}
    </div>
  );
}

// ── Empty State ───────────────────────────────────────────────────────────────

function EmptyState({ onCreate, t }: { onCreate: () => void; t: (k: string) => string }) {
  return (
    <div className="bg-white rounded-2xl border border-border/70 p-12 text-center">
      <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
        <UsersRound className="w-7 h-7 text-primary" />
      </div>
      <h3
        className="text-foreground mb-1.5"
        style={{ fontSize: '18px', fontWeight: 600, letterSpacing: '-0.005em' }}
      >
        {t('userGroups.empty.title')}
      </h3>
      <p
        className="text-muted-foreground max-w-md mx-auto mb-6"
        style={{ fontSize: 'var(--text-sm)', lineHeight: 1.5 }}
      >
        {t('userGroups.empty.description')}
      </p>
      <button
        type="button"
        onClick={onCreate}
        className="inline-flex items-center gap-2 h-10 px-5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all active:scale-[0.98] shadow-sm"
        style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
      >
        <Plus className="w-4 h-4" />
        {t('userGroups.createFirst')}
      </button>
    </div>
  );
}

// ── Group Card ────────────────────────────────────────────────────────────────

function GroupCard({
  group,
  index,
  expanded,
  onToggle,
  onDelete,
  onNameChange,
  onMappingChange,
  justMapped,
  isRTL,
  t,
}: {
  group: UserGroup;
  index: number;
  expanded: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onNameChange: (n: string) => void;
  onMappingChange: (roleId: string, idmId: string) => void;
  justMapped: string | null;
  isRTL: boolean;
  t: (k: string) => string;
}) {
  const mappedCount = BUSINESS_ROLES.filter((r) => !!group.mapping[r.id]).length;
  const totalRoles = BUSINESS_ROLES.length;
  const coverage = totalRoles === 0 ? 0 : Math.round((mappedCount / totalRoles) * 100);
  const isComplete = mappedCount === totalRoles;

  return (
    <section
      className="bg-white rounded-2xl border border-border/70 overflow-hidden"
    >
      {/* Header row */}
      <div className="px-5 py-5">
        <div className="flex items-start gap-4">
          <div
            className="shrink-0 w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-mono font-semibold mt-6"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            {index + 1}
          </div>

          <div className="flex-1 min-w-0">
            <label
              className={`block mb-1.5 uppercase text-muted-foreground font-semibold ${isRTL ? 'text-right' : 'text-left'}`}
              style={{ fontSize: '10px', letterSpacing: '0.12em' }}
            >
              {t('userGroups.groupName')}
            </label>
            <input
              type="text"
              value={group.name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder={t('userGroups.groupNamePlaceholder')}
              className={`w-full h-11 bg-white border border-border/70 rounded-xl px-4 text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors ${isRTL ? 'text-right' : 'text-left'}`}
              style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
            />
          </div>

          <div className="flex items-center gap-1 shrink-0 mt-6">
            <button
              type="button"
              onClick={onDelete}
              title={t('userGroups.deleteGroup')}
              className="h-10 w-10 inline-flex items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onToggle}
              title={expanded ? t('userGroups.collapse') : t('userGroups.expand')}
              className="h-10 w-10 inline-flex items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Coverage meter */}
        <div className="flex items-center gap-2 mt-4">
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
      </div>

      {/* Mapping section */}
      <div
        className={`grid transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden min-h-0">
          <div className="px-5 pb-5 pt-1 border-t border-border/60 space-y-2">
            {BUSINESS_ROLES.map((role, i) => (
              <MappingRow
                key={role.id}
                role={role}
                mapped={group.mapping[role.id] ?? ''}
                idmOptions={IDM_ROLES}
                onChange={(v) => onMappingChange(role.id, v)}
                justMapped={justMapped === `${group.id}:${role.id}`}
                index={i}
                isRTL={isRTL}
                t={t}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Mapping Row ───────────────────────────────────────────────────────────────

function MappingRow({
  role,
  mapped,
  idmOptions,
  onChange,
  justMapped,
  index,
  isRTL,
  t,
}: {
  role: BusinessRole;
  mapped: string;
  idmOptions: IdmRole[];
  onChange: (v: string) => void;
  justMapped: boolean;
  index: number;
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
      <ChevronDown
        className="absolute top-1/2 -translate-y-1/2 right-3 w-4 h-4 text-muted-foreground pointer-events-none"
      />
    </div>
  );

  return (
    <div
      data-just-mapped={justMapped ? 'true' : undefined}
      className={`group relative grid grid-cols-[1fr_auto_1fr] items-center gap-4
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
