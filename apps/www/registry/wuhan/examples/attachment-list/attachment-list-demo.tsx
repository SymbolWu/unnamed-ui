"use client";

import { useMemo, useState } from "react";
import { AttachmentListComposed } from "@/registry/wuhan/composed/attachment-list/attachment-list";
import { FileText } from "lucide-react";

type DemoAttachment = {
  id: string;
  name?: string;
  fileType?: string;
  fileSize?: string;
  isImage?: boolean;
  loading?: boolean;
  thumbnail?: string;
};

export default function AttachmentListDemo() {
  const initial = useMemo<DemoAttachment[]>(
    () => [
      {
        id: "img-1",
        isImage: true,
        thumbnail: "https://placehold.co/56x56",
        name: "image.png",
      },
      {
        id: "img-2",
        isImage: true,
        thumbnail: "https://placehold.co/56x56",
        name: "photo.jpg",
      },
      {
        id: "img-uploading",
        isImage: true,
        thumbnail: "https://placehold.co/56x56",
        name: "uploading.jpg",
        loading: true,
      },
      {
        id: "doc-1",
        name: "需求文档.pdf",
        fileType: "PDF",
        fileSize: "1.2MB",
      },
      {
        id: "doc-2",
        name: "会议纪要.docx",
        fileType: "DOCX",
        fileSize: "92KB",
        loading: true,
      },
      {
        id: "doc-3",
        name: "产品设计稿.fig",
        fileType: "FIG",
        fileSize: "3.5MB",
      },
      {
        id: "doc-4",
        name: "用户调研报告.xlsx",
        fileType: "XLSX",
        fileSize: "856KB",
      },
      {
        id: "img-3",
        isImage: true,
        thumbnail: "https://placehold.co/56x56",
        name: "screenshot.png",
      },
      {
        id: "doc-5",
        name: "技术方案.md",
        fileType: "MD",
        fileSize: "45KB",
      },
    ],
    [],
  );

  const [items, setItems] = useState<DemoAttachment[]>(initial);

  return (
    <div className="w-full max-w-2xl">
      <AttachmentListComposed
        className="w-full"
        items={items.map((item) => ({
          id: item.id,
          name: item.name,
          fileType: item.fileType,
          fileSize: item.fileSize,
          isImage: item.isImage,
          loading: item.loading,
          thumbnail: item.thumbnail,
          icon: item.isImage ? undefined : <FileText className="size-4" />,
        }))}
        onRemove={(id) => setItems((prev) => prev.filter((x) => x.id !== id))}
      />
    </div>
  );
}
