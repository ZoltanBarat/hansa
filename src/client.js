import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    'https://ldrmkgnpshmnuvdsvwuf.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxkcm1rZ25wc2htbnV2ZHN2d3VmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTQxODM0NTcsImV4cCI6MTk2OTc1OTQ1N30.fLCG4312a4iEDclcBLVvygIA5GzxU78XyIB5trc_FOA'
)