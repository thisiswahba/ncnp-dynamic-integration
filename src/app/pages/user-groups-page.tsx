import { useState } from 'react';
import { toast } from 'sonner';
import {
  Search,
  Filter,
  ChevronDown,
  Plus,
  MoreVertical,
  Pencil,
  Trash2,
  UsersRound,
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/app/components/ui/alert-dialog';
import { useLanguage } from '@/app/contexts/language-context';
import {
  UserGroupEditSheet,
  type UserGroupDraft,
} from '@/app/components/user-group-edit-sheet';

interface UserGroup {
  id: string;
  name: string;
  idmRolesCount: number;
  status: 'active' | 'inactive';
  createdDate: string;
  lastEditDate: string;
  mapping: Record<string, string>;
}

const initialGroups: UserGroup[] = [
  {
    id: '#001',
    name: 'Compliance Team',
    idmRolesCount: 6,
    status: 'active',
    createdDate: '12/03/2026',
    lastEditDate: '18/04/2026',
    mapping: {
      r1: 'idm-1',
      r2: 'idm-2',
      r3: 'idm-3',
      r4: 'idm-4',
      r5: 'idm-5',
      r6: 'idm-6',
    },
  },
  {
    id: '#002',
    name: 'Regional Reviewers',
    idmRolesCount: 4,
    status: 'active',
    createdDate: '05/03/2026',
    lastEditDate: '15/04/2026',
    mapping: { r1: 'idm-1', r2: 'idm-2', r3: 'idm-3', r4: 'idm-4' },
  },
  {
    id: '#003',
    name: 'Executive Approvers',
    idmRolesCount: 3,
    status: 'active',
    createdDate: '28/02/2026',
    lastEditDate: '12/04/2026',
    mapping: { r2: 'idm-2', r3: 'idm-3', r6: 'idm-6' },
  },
  {
    id: '#004',
    name: 'Audit Advisors',
    idmRolesCount: 1,
    status: 'inactive',
    createdDate: '20/02/2026',
    lastEditDate: '08/04/2026',
    mapping: { r1: 'idm-7' },
  },
];

type ConfirmKind = { kind: 'delete'; groupId: string } | null;

export function UserGroupsPage() {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';

  const [groups, setGroups] = useState<UserGroup[]>(initialGroups);
  const [searchQuery, setSearchQuery] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingDraft, setEditingDraft] = useState<UserGroupDraft | null>(null);

  const [confirm, setConfirm] = useState<ConfirmKind>(null);

  const filteredGroups = groups.filter(
    (g) =>
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openCreate = () => {
    setEditingDraft({ name: '', mapping: {} });
    setSheetOpen(true);
  };

  const openEdit = (group: UserGroup) => {
    setEditingDraft({ id: group.id, name: group.name, mapping: group.mapping });
    setSheetOpen(true);
    setOpenMenuId(null);
  };

  const handleSaveDraft = (draft: UserGroupDraft) => {
    if (draft.id) {
      // edit
      setGroups((prev) =>
        prev.map((g) =>
          g.id === draft.id
            ? {
                ...g,
                name: draft.name,
                mapping: draft.mapping,
                idmRolesCount: Object.keys(draft.mapping).length,
                lastEditDate: today(),
              }
            : g
        )
      );
      toast.success(t('userGroups.toast.success'), { description: t('userGroups.toast.updated') });
    } else {
      // create
      const newId = `#${String(groups.length + 1).padStart(3, '0')}`;
      const newGroup: UserGroup = {
        id: newId,
        name: draft.name,
        mapping: draft.mapping,
        idmRolesCount: Object.keys(draft.mapping).length,
        status: 'active',
        createdDate: today(),
        lastEditDate: today(),
      };
      setGroups((prev) => [newGroup, ...prev]);
      toast.success(t('userGroups.toast.success'), { description: t('userGroups.toast.created') });
    }
  };

  const handleConfirm = () => {
    if (!confirm) return;
    if (confirm.kind === 'delete') {
      setGroups((prev) => prev.filter((g) => g.id !== confirm.groupId));
      toast.success(t('userGroups.toast.success'), { description: t('userGroups.toast.deleted') });
    }
    setConfirm(null);
  };

  const pageNumbers = () => [1] as (number | string)[];

  return (
    <div
      className="px-8 py-6 max-w-7xl mx-auto"
      dir={isRTL ? 'rtl' : 'ltr'}
      onClick={() => setOpenMenuId(null)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className={isRTL ? 'text-right' : 'text-left'}>
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
        <Button
          onClick={openCreate}
          className="h-11 px-5 flex items-center gap-2"
          style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
        >
          <Plus className="w-4 h-4" />
          {t('userGroups.createNew')}
        </Button>
      </div>

      {/* Search + Filter */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1">
          <Search
            className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none ${isRTL ? 'right-4' : 'left-4'}`}
          />
          <input
            type="text"
            placeholder={t('userGroups.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full h-12 bg-white border border-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground transition-colors ${isRTL ? 'pr-11 pl-4 text-right' : 'pl-11 pr-4 text-left'}`}
            style={{ fontSize: 'var(--text-sm)' }}
          />
        </div>
        <button
          type="button"
          className="h-12 px-4 bg-white border border-border rounded-lg hover:bg-muted/50 transition-colors flex items-center gap-2 text-foreground"
          style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
        >
          <Filter className="w-4 h-4" />
          <span>{t('userGroups.filter')}</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Entries count */}
      <div className={`mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
        <span className="text-foreground" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
          {t('userGroups.entriesInTable')}:{' '}
        </span>
        <span className="text-primary" style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
          {filteredGroups.length}
        </span>
      </div>

      {/* Table or empty */}
      {filteredGroups.length > 0 ? (
        <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
          <div className="overflow-x-auto overflow-y-visible">
            <table className="w-full" dir={isRTL ? 'rtl' : 'ltr'}>
              <thead className="bg-muted/40 border-b border-border">
                <tr>
                  {[
                    t('userGroups.col.id'),
                    t('userGroups.col.name'),
                    t('userGroups.col.idmRoles'),
                    t('userGroups.col.createdDate'),
                    t('userGroups.col.lastEditDate'),
                    t('userGroups.col.actions'),
                  ].map((label) => (
                    <th
                      key={label}
                      className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}
                    >
                      <span
                        className="text-foreground uppercase"
                        style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em' }}
                      >
                        {label}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredGroups.map((group) => (
                  <tr key={group.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4">
                      <span
                        className="text-foreground font-mono"
                        style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}
                      >
                        {group.id}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => openEdit(group)}
                        className={`text-primary hover:text-primary/80 transition-colors hover:underline ${isRTL ? 'text-right' : 'text-left'}`}
                        style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
                      >
                        {group.name}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="inline-flex items-center justify-center min-w-7 h-6 px-2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 font-mono tabular-nums"
                        style={{ fontSize: '11px', fontWeight: 600 }}
                      >
                        {group.idmRolesCount}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="text-muted-foreground tabular-nums"
                        style={{ fontSize: 'var(--text-sm)' }}
                      >
                        {group.createdDate}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="text-muted-foreground tabular-nums"
                        style={{ fontSize: 'var(--text-sm)' }}
                      >
                        {group.lastEditDate}
                      </span>
                    </td>
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <div className="relative">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            setOpenMenuId(openMenuId === group.id ? null : group.id)
                          }
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                        {openMenuId === group.id && (
                          <div
                            className={`absolute z-50 mt-1 w-48 rounded-lg border border-border bg-white shadow-lg overflow-hidden ${isRTL ? 'left-0' : 'right-0'}`}
                          >
                            <MenuItem
                              icon={<Pencil className="w-4 h-4" />}
                              label={t('userGroups.action.edit')}
                              onClick={() => openEdit(group)}
                              isRTL={isRTL}
                            />
                            <div className="border-t border-border" />
                            <MenuItem
                              icon={<Trash2 className="w-4 h-4 text-destructive" />}
                              label={t('userGroups.action.delete')}
                              onClick={() => {
                                setConfirm({ kind: 'delete', groupId: group.id });
                                setOpenMenuId(null);
                              }}
                              isRTL={isRTL}
                              danger
                            />
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <EmptyState onCreate={openCreate} t={t} />
      )}

      {/* Pagination */}
      {filteredGroups.length > 0 && (
        <div className="flex items-center justify-center gap-2 mt-6" dir="ltr">
          <Button variant="ghost" size="sm" disabled className="h-9 min-w-9 px-3">
            <ChevronDown className="w-4 h-4 rotate-90" />
          </Button>
          {pageNumbers().map((page) => (
            <Button
              key={String(page)}
              variant="default"
              size="sm"
              className="h-9 min-w-9 px-3 bg-transparent text-primary border-b-2 border-primary rounded-none hover:bg-transparent"
              style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}
            >
              {page}
            </Button>
          ))}
          <Button variant="ghost" size="sm" disabled className="h-9 min-w-9 px-3">
            <ChevronDown className="w-4 h-4 -rotate-90" />
          </Button>
        </div>
      )}

      {/* Edit/Create sheet */}
      <UserGroupEditSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        initial={editingDraft}
        onSave={handleSaveDraft}
      />

      {/* Confirm delete dialog */}
      <AlertDialog open={!!confirm} onOpenChange={(o) => !o && setConfirm(null)}>
        <AlertDialogContent dir={isRTL ? 'rtl' : 'ltr'}>
          <AlertDialogHeader>
            <AlertDialogTitle className={isRTL ? 'text-right' : 'text-left'}>
              {t('userGroups.confirm.deleteTitle')}
            </AlertDialogTitle>
            <AlertDialogDescription className={isRTL ? 'text-right' : 'text-left'}>
              {t('userGroups.confirm.deleteDesc')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('userGroups.cancel')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {t('userGroups.action.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}

function today() {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function MenuItem({
  icon,
  label,
  onClick,
  isRTL,
  danger,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  isRTL: boolean;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full px-3 py-2 hover:bg-muted transition-colors flex items-center gap-2.5 ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'} ${danger ? 'text-destructive' : 'text-foreground'}`}
      style={{ fontSize: 'var(--text-sm)' }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

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
