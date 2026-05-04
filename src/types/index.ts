export type FinancingStatus = 'draft' | 'pending' | 'approved' | 'disbursed' | 'repaying' | 'completed' | 'rejected'

export interface FinancingRequest {
  id: string
  user_id: string
  supplier_name: string
  invoice_number: string
  amount: number
  currency: string
  purpose: string
  repayment_weeks: number
  status: FinancingStatus
  delivery_confirmed: boolean
  delivery_date: string | null
  fee_percent: number
  total_repayment: number
  created_at: string
  deleted_at: string | null
}

export interface RepaymentSchedule {
  id: string
  request_id: string
  user_id: string
  due_date: string
  amount: number
  paid: boolean
  paid_at: string | null
  created_at: string
}

export interface UserProfile {
  id: string
  user_id: string
  full_name: string
  business_name: string
  phone: string
  country: string
  role: 'sme' | 'admin' | 'investor'
  created_at: string
}

export interface SeedFinancingRequest extends FinancingRequest {
  _seed?: boolean
}
