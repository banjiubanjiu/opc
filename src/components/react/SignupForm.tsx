import { useState } from 'react';
import type { FormEvent } from 'react';
import {
  Form,
  Button,
  TextField,
  Label,
  Input,
  FieldError,
  Select,
  ListBox,
  TextArea,
} from '@heroui/react';

interface Props {
  eventSlug?: string;
  endpoint?: string;
}

const statusOptions = ['正在经营一人公司', '独立开发 / 自由职业', '计划中,还在准备', '还在上班,先来看看'];

export default function SignupForm({ eventSlug = '', endpoint = '' }: Props) {
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (eventSlug) payload.event = eventSlug;

    if (endpoint) {
      try {
        await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch {
        // 后端失败:降级提示,不阻塞报名意向
      }
    } else {
      // 本地演示:无后端端点,记录到控制台
      console.log('[OPC signup]', payload);
    }
    form.reset();
    setSubmitted(true);
  }

  return (
    <Form onSubmit={handleSubmit} className="grid gap-4 rounded-xl bg-surface-card p-6 sm:p-8">
      {submitted && (
        <p className="rounded-lg bg-accent-soft px-4 py-3 text-sm text-accent" role="status">
          ✓ 报名已收到。我们会通过微信 / 短信与你确认,注意查收。
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField name="name" isRequired>
          <Label className="mb-1 block text-sm text-muted">称呼 *</Label>
          <Input variant="secondary" placeholder="怎么称呼你" className="w-full" />
          <FieldError />
        </TextField>
        <TextField name="contact" isRequired>
          <Label className="mb-1 block text-sm text-muted">微信 / 手机号 *</Label>
          <Input variant="secondary" placeholder="用于确认到场" className="w-full" />
          <FieldError />
        </TextField>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Select name="status" className="w-full">
          <Label className="mb-1 block text-sm text-muted">你现在的状态</Label>
          <Select.Trigger variant="secondary">
            <Select.Value placeholder="选择你现在的状态" />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {statusOptions.map((opt) => (
                <ListBox.Item key={opt} id={opt} textValue={opt}>
                  <Label>{opt}</Label>
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
        <TextField name="city">
          <Label className="mb-1 block text-sm text-muted">所在城市</Label>
          <Input variant="secondary" placeholder="如:佛山 / 广州" className="w-full" />
        </TextField>
      </div>

      <TextField name="topic">
        <Label className="mb-1 block text-sm text-muted">你最想聊的话题</Label>
        <TextArea
          variant="secondary"
          rows={3}
          aria-label="你最想聊的话题"
          placeholder="获客、定价、AI 工具、时间管理……都可以"
        />
      </TextField>

      <p className="text-xs text-muted">
        活动为公益,仅需支付 <span className="font-medium text-coral">49 元</span> 茶水费。报名信息仅用于本次活动联系。
      </p>

      <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
        提交报名
      </Button>
    </Form>
  );
}
