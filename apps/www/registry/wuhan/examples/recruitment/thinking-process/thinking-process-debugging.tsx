"use client";

import * as React from "react";
import { BookOpen, ChevronRight } from "lucide-react";
import {
  ThinkingLoadingDotsPrimitive,
  type ThinkingStepStatus,
} from "@/registry/wuhan/blocks/thinking-process/thinking-process-01";
import { ThinkingStep } from "@/registry/wuhan/composed/thinking-process/thinking-process";
import type { ThinkingStepItemProps } from "@/registry/wuhan/composed/thinking-step-item/thinking-step-item";
type StreamSpeed = "slow" | "medium" | "fast";
type Phase =
  | {
      type: "text";
      key: string;
      fullText: string;
    }
  | {
      type: "step";
      key: string;
      step: ThinkingStepItemProps;
    };

const INTRO_TEXT =
  "用户想要了解 AI 发展的趋势。这是一个比较开放的问题，需要从多个维度来概括当前的主要方向。考虑到用户可能不是专业人士，我会先明确范围，再提炼关键维度。";
const OUTRO_TEXT =
  "关键步骤完成后，我会基于维度给出结论，并附上可执行的建议与风险提示。";

const FULL_STEPS = [
  {
    status: "success",
    title: "明确研究目标与边界",
    items: [
      {
        content: "明确研究目标与边界，我将调用知识和搜索工具。",
        toolCall: {
          icon: <BookOpen className="size-4" />,
          title: "调取知识",
          content: "我正在调取知识库资料",
        },
        files: [
          { icon: "📄", name: "AI发展趋势.pdf" },
          { icon: "📄", name: "AI发展历史.doc" },
        ],
      },
    ],
  },
  {
    status: "loading",
    title: "对比岗位与简历关键信息",
    items: [
      { content: "正在抽取关键技能并计算匹配度..." },
      { content: "对照 JD 与历史项目，补齐软技能维度。" },
    ],
  },
  {
    status: "success",
    title: "生成结论与问题清单",
    items: [
      { content: "已生成 10 个面试问题，并输出风险点说明。" },
      { content: "补充候选人潜力评估与跟进建议。" },
    ],
  },
] satisfies ThinkingStepItemProps[];

const SPEED_CONFIG: Record<
  StreamSpeed,
  { interval: number; textStep: number }
> = {
  slow: { interval: 320, textStep: 2 },
  medium: { interval: 160, textStep: 4 },
  fast: { interval: 80, textStep: 8 },
};

export default function ThinkingProcessDebugging() {
  const phases = React.useMemo<Phase[]>(
    () => [
      { type: "text", key: "intro", fullText: INTRO_TEXT },
      { type: "step", key: "step-1", step: FULL_STEPS[0] },
      { type: "step", key: "step-2", step: FULL_STEPS[1] },
      { type: "step", key: "step-3", step: FULL_STEPS[2] },
      { type: "text", key: "outro", fullText: OUTRO_TEXT },
    ],
    [],
  );

  const [title, setTitle] = React.useState("");
  const [headerMeta, setHeaderMeta] = React.useState("");
  const [useHeaderMeta, setUseHeaderMeta] = React.useState(false);
  const [duration, setDuration] = React.useState(0);
  const [longRunning, setLongRunning] = React.useState(false);
  const [hint, setHint] = React.useState("");
  const [longRunningHint, setLongRunningHint] = React.useState("");
  const [cancelledStepTitle, setCancelledStepTitle] = React.useState("");
  const [triggerId, setTriggerId] = React.useState("");
  const [contentId, setContentId] = React.useState("");
  const [useCustomIcon, setUseCustomIcon] = React.useState(false);
  const [useCustomArrow, setUseCustomArrow] = React.useState(false);
  const [speed, setSpeed] = React.useState<StreamSpeed>("medium");
  const [isStreaming, setIsStreaming] = React.useState(false);
  const [streamState, setStreamState] = React.useState({
    phaseIndex: 0,
    textProgress: 0,
    stepProgress: 0,
  });

  const isCompleted = streamState.phaseIndex >= phases.length;
  const hasStarted =
    streamState.phaseIndex > 0 ||
    streamState.textProgress > 0 ||
    streamState.stepProgress > 0;

  const resolvedStatus: ThinkingStepStatus = isCompleted
    ? "completed"
    : hasStarted
      ? "thinking"
      : "pending";

  const resolvedHeaderMeta =
    useHeaderMeta && headerMeta.trim().length > 0
      ? headerMeta.trim()
      : undefined;
  const resolvedHint = hint.trim().length > 0 ? hint.trim() : undefined;
  const resolvedLongRunningHint =
    longRunningHint.trim().length > 0 ? longRunningHint.trim() : undefined;
  const resolvedCancelledStepTitle =
    cancelledStepTitle.trim().length > 0
      ? cancelledStepTitle.trim()
      : undefined;
  const resolvedLabels =
    resolvedLongRunningHint || resolvedCancelledStepTitle
      ? {
          longRunningHint: resolvedLongRunningHint,
          cancelledStepTitle: resolvedCancelledStepTitle,
        }
      : undefined;
  const resolvedTitle =
    title.trim().length > 0
      ? title.trim()
      : resolvedStatus === "completed"
        ? "思考完成"
        : "思考中...";

  const contentBlocks = React.useMemo(() => {
    const blocks: Array<
      | { type: "text"; key: string; content: React.ReactNode }
      | {
          type: "subSteps";
          key: string;
          steps: ThinkingStepItemProps[];
        }
    > = [];
    const stepsBuffer: ThinkingStepItemProps[] = [];
    const currentPhase = phases[streamState.phaseIndex];
    const flushSteps = () => {
      if (stepsBuffer.length === 0) return;
      blocks.push({
        type: "subSteps",
        key: `steps-${blocks.length}`,
        steps: [...stepsBuffer],
      });
      stepsBuffer.length = 0;
    };

    phases.forEach((phase, index) => {
      if (phase.type === "text") {
        flushSteps();
        if (isCompleted || index < streamState.phaseIndex) {
          blocks.push({
            type: "text",
            key: phase.key,
            content: phase.fullText,
          });
          return;
        }
        if (currentPhase?.key === phase.key) {
          blocks.push({
            type: "text",
            key: phase.key,
            content: phase.fullText.slice(0, streamState.textProgress) || "",
          });
        }
        return;
      }

      if (phase.type === "step") {
        if (!isCompleted && index > streamState.phaseIndex) return;
        const totalItems = phase.step.items?.length ?? 0;
        const isCurrent = currentPhase?.key === phase.key && !isCompleted;
        const visibleCount = isCompleted
          ? totalItems
          : isCurrent
            ? Math.min(totalItems, streamState.stepProgress)
            : totalItems;
        const status: ThinkingStepItemProps["status"] = isCompleted
          ? "success"
          : isCurrent
            ? "loading"
            : "success";

        stepsBuffer.push({
          ...phase.step,
          status,
          items: phase.step.items?.slice(0, visibleCount),
          defaultOpen: true,
        });
      }
    });

    flushSteps();

    return blocks;
  }, [
    isCompleted,
    phases,
    streamState.phaseIndex,
    streamState.stepProgress,
    streamState.textProgress,
  ]);

  React.useEffect(() => {
    if (!isStreaming) return;
    const config = SPEED_CONFIG[speed];
    const timer = window.setInterval(() => {
      setStreamState((prev) => {
        const phase = phases[prev.phaseIndex];
        if (!phase) return prev;
        if (phase.type === "text") {
          const nextText = Math.min(
            prev.textProgress + config.textStep,
            phase.fullText.length,
          );
          if (nextText >= phase.fullText.length) {
            return {
              phaseIndex: prev.phaseIndex + 1,
              textProgress: 0,
              stepProgress: 0,
            };
          }
          return { ...prev, textProgress: nextText };
        }
        const totalItems = phase.step.items?.length ?? 0;
        const nextStep = Math.min(prev.stepProgress + 1, totalItems);
        if (nextStep >= totalItems) {
          return {
            phaseIndex: prev.phaseIndex + 1,
            textProgress: 0,
            stepProgress: 0,
          };
        }
        return { ...prev, stepProgress: nextStep };
      });
    }, config.interval);

    return () => window.clearInterval(timer);
  }, [isStreaming, phases, speed]);

  React.useEffect(() => {
    if (!isStreaming) return;
    const timer = window.setInterval(
      () => setDuration((prev) => prev + 1),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [isStreaming]);

  React.useEffect(() => {
    if (!isStreaming) return;
    if (isCompleted) {
      setIsStreaming(false);
    }
  }, [isCompleted, isStreaming]);

  const handleStart = () => {
    setStreamState({ phaseIndex: 0, textProgress: 0, stepProgress: 0 });
    setDuration(0);
    setIsStreaming(true);
  };

  const handleStop = () => {
    setIsStreaming(false);
  };

  const handleComplete = () => {
    setIsStreaming(false);
    setStreamState({
      phaseIndex: phases.length,
      textProgress: 0,
      stepProgress: 0,
    });
  };

  const handleReset = () => {
    setIsStreaming(false);
    setStreamState({ phaseIndex: 0, textProgress: 0, stepProgress: 0 });
    setDuration(0);
  };

  return (
    <div className="w-full h-full max-w-5xl flex flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-xl border border-border/60 bg-background/80 p-4">
        <div className="text-sm font-medium text-foreground">配置项</div>

        <details
          className="group rounded-lg border border-border/60 bg-background p-3"
          open
        >
          <summary className="flex cursor-pointer items-center justify-between text-sm font-medium text-foreground">
            基础信息
            <ChevronRight className="size-4 transition-transform group-open:rotate-90" />
          </summary>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-xs text-muted-foreground">
              标题
              <input
                className="h-9 rounded-md border border-border/60 bg-background px-3 text-sm text-foreground"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </label>
            <label className="flex flex-col gap-2 text-xs text-muted-foreground">
              右侧文案（headerMeta）
              <input
                className="h-9 rounded-md border border-border/60 bg-background px-3 text-sm text-foreground"
                placeholder="如：耗时 12s / 已使用 3 个工具"
                value={headerMeta}
                onChange={(event) => setHeaderMeta(event.target.value)}
                disabled={!useHeaderMeta}
              />
            </label>
            <label className="inline-flex items-center gap-2 text-xs text-muted-foreground">
              <input
                type="checkbox"
                checked={useHeaderMeta}
                onChange={(event) => setUseHeaderMeta(event.target.checked)}
              />
              启用 headerMeta（否则展示 duration）
            </label>
            <label className="flex flex-col gap-2 text-xs text-muted-foreground">
              时长（秒）
              <input
                className="h-9 rounded-md border border-border/60 bg-background px-3 text-sm text-foreground"
                type="number"
                min={0}
                value={duration}
                onChange={(event) =>
                  setDuration(Number(event.target.value) || 0)
                }
              />
            </label>
          </div>
        </details>

        <details className="group rounded-lg border border-border/60 bg-background p-3">
          <summary className="flex cursor-pointer items-center justify-between text-sm font-medium text-foreground">
            体验与提示
            <ChevronRight className="size-4 transition-transform group-open:rotate-90" />
          </summary>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <label className="inline-flex items-center gap-2 text-xs text-muted-foreground">
              <input
                type="checkbox"
                checked={longRunning}
                onChange={(event) => setLongRunning(event.target.checked)}
              />
              longRunning
            </label>
            <label className="flex flex-col gap-2 text-xs text-muted-foreground">
              hint
              <input
                className="h-9 rounded-md border border-border/60 bg-background px-3 text-sm text-foreground"
                placeholder="可选，留空则走默认提示"
                value={hint}
                onChange={(event) => setHint(event.target.value)}
              />
            </label>
            <label className="flex flex-col gap-2 text-xs text-muted-foreground">
              labels.longRunningHint
              <input
                className="h-9 rounded-md border border-border/60 bg-background px-3 text-sm text-foreground"
                placeholder="覆盖默认长耗时提示文案"
                value={longRunningHint}
                onChange={(event) => setLongRunningHint(event.target.value)}
              />
            </label>
            <label className="flex flex-col gap-2 text-xs text-muted-foreground">
              labels.cancelledStepTitle
              <input
                className="h-9 rounded-md border border-border/60 bg-background px-3 text-sm text-foreground"
                placeholder="取消时追加步骤标题"
                value={cancelledStepTitle}
                onChange={(event) => setCancelledStepTitle(event.target.value)}
              />
            </label>
          </div>
        </details>

        <details className="group rounded-lg border border-border/60 bg-background p-3">
          <summary className="flex cursor-pointer items-center justify-between text-sm font-medium text-foreground">
            外观与可访问性
            <ChevronRight className="size-4 transition-transform group-open:rotate-90" />
          </summary>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <label className="inline-flex items-center gap-2 text-xs text-muted-foreground">
              <input
                type="checkbox"
                checked={useCustomIcon}
                onChange={(event) => setUseCustomIcon(event.target.checked)}
              />
              icon（自定义 Loading 图标）
            </label>
            <label className="inline-flex items-center gap-2 text-xs text-muted-foreground">
              <input
                type="checkbox"
                checked={useCustomArrow}
                onChange={(event) => setUseCustomArrow(event.target.checked)}
              />
              arrowIcon（自定义折叠箭头）
            </label>
            <label className="flex flex-col gap-2 text-xs text-muted-foreground">
              triggerId
              <input
                className="h-9 rounded-md border border-border/60 bg-background px-3 text-sm text-foreground"
                placeholder="可选，自定义 aria-controls"
                value={triggerId}
                onChange={(event) => setTriggerId(event.target.value)}
              />
            </label>
            <label className="flex flex-col gap-2 text-xs text-muted-foreground">
              contentId
              <input
                className="h-9 rounded-md border border-border/60 bg-background px-3 text-sm text-foreground"
                placeholder="可选，自定义 aria-labelledby"
                value={contentId}
                onChange={(event) => setContentId(event.target.value)}
              />
            </label>
          </div>
        </details>

        <details
          className="group rounded-lg border border-border/60 bg-background p-3"
          open
        >
          <summary className="flex cursor-pointer items-center justify-between text-sm font-medium text-foreground">
            流式控制
            <ChevronRight className="size-4 transition-transform group-open:rotate-90" />
          </summary>
          <div className="mt-3 flex flex-col gap-3">
            <label className="flex flex-col gap-2 text-xs text-muted-foreground md:max-w-[240px]">
              速度
              <select
                className="h-9 rounded-md border border-border/60 bg-background px-3 text-sm text-foreground"
                value={speed}
                onChange={(event) =>
                  setSpeed(event.target.value as StreamSpeed)
                }
              >
                <option value="slow">慢</option>
                <option value="medium">中</option>
                <option value="fast">快</option>
              </select>
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="h-9 rounded-md border border-border/60 bg-background px-4 text-sm text-foreground"
                onClick={handleStart}
              >
                开始流式
              </button>
              <button
                type="button"
                className="h-9 rounded-md border border-border/60 bg-background px-4 text-sm text-foreground"
                onClick={handleStop}
              >
                暂停
              </button>
              <button
                type="button"
                className="h-9 rounded-md border border-border/60 bg-background px-4 text-sm text-foreground"
                onClick={handleComplete}
              >
                一键完成
              </button>
              <button
                type="button"
                className="h-9 rounded-md border border-border/60 bg-background px-4 text-sm text-foreground"
                onClick={handleReset}
              >
                重置
              </button>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              状态：
              <span className="text-foreground">{resolvedStatus}</span>
              <span>·</span>
              <span>阶段：{phases[streamState.phaseIndex]?.key ?? "完成"}</span>
              <span>·</span>
              <span>{isStreaming ? "流式中" : "已暂停"}</span>
            </div>
          </div>
        </details>
      </div>

      <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
        <div className="mb-3 text-xs text-muted-foreground">
          AI 消息预览（ThinkingStep 内嵌）
        </div>
        <div className="flex flex-col gap-3 rounded-lg border border-border/40 bg-background p-4">
          <ThinkingStep
            status={resolvedStatus}
            title={resolvedTitle}
            duration={duration}
            headerMeta={resolvedHeaderMeta}
            longRunning={longRunning}
            hint={resolvedHint}
            labels={resolvedLabels}
            triggerId={triggerId.trim() || undefined}
            contentId={contentId.trim() || undefined}
            icon={useCustomIcon ? <ThinkingLoadingDotsPrimitive /> : undefined}
            arrowIcon={
              useCustomArrow ? <ChevronRight className="size-4" /> : undefined
            }
            contentBlocks={contentBlocks}
          />
        </div>
      </div>
    </div>
  );
}
