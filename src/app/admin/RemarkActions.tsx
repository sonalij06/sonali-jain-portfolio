"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteRemark, setRemarkApproval } from "@/app/admin/actions";
import { ConfirmDialog } from "@/components/ConfirmDialog";

type OpenDialog = "toggle" | "delete" | null;

export function RemarkActions({ id, approved }: { id: string; approved: boolean }) {
  const [isPending, startTransition] = useTransition();
  const [openDialog, setOpenDialog] = useState<OpenDialog>(null);
  const router = useRouter();

  function confirmToggle() {
    startTransition(async () => {
      await setRemarkApproval(id, !approved);
      router.refresh();
      setOpenDialog(null);
    });
  }

  function confirmDelete() {
    startTransition(async () => {
      await deleteRemark(id);
      router.refresh();
      setOpenDialog(null);
    });
  }

  return (
    <>
      <div className="admin-row-actions">
        <button
          type="button"
          className="btn btn-ghost admin-btn-sm"
          disabled={isPending}
          onClick={() => setOpenDialog("toggle")}
        >
          {approved ? "Hide" : "Publish"}
        </button>
        <button
          type="button"
          className="btn btn-ghost admin-btn-sm admin-btn-danger"
          disabled={isPending}
          onClick={() => setOpenDialog("delete")}
        >
          Delete
        </button>
      </div>

      <ConfirmDialog
        open={openDialog === "toggle"}
        title={approved ? "Hide this remark?" : "Publish this remark?"}
        description={
          approved
            ? "It disappears from the public Remarks section immediately."
            : "It appears in the public Remarks section immediately."
        }
        confirmLabel={approved ? "Hide" : "Publish"}
        pending={isPending}
        onConfirm={confirmToggle}
        onCancel={() => setOpenDialog(null)}
      />
      <ConfirmDialog
        open={openDialog === "delete"}
        title="Delete this remark?"
        description="This removes it permanently — there's no undo."
        confirmLabel="Delete"
        danger
        pending={isPending}
        onConfirm={confirmDelete}
        onCancel={() => setOpenDialog(null)}
      />
    </>
  );
}
