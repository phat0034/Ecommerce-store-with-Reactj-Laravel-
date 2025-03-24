<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class ProductSeeder extends Seeder
{
    public function run()
    {
        // Quần áo nam, nữ, trẻ em (15 sản phẩm)
        $clothing = [

            [
                'namepd' => 'Áo Thun Nam Uniqlo U AIRism Cotton',
                'price' => 390000,
                'saleprice' => 349000,
                'idtype' => 7,
                'img' => 'clothing/uniqlo-airism-cotton-tshirt.jpg'
            ],
            [

                'namepd' => 'Quần Jeans Nam Levi\'s 511 Slim Fit',
                'price' => 1990000,
                'saleprice' => 1590000,
                'idtype' => 7,
                'img' => 'clothing/levis-511-slim-jeans.jpg'
            ],
            [

                'namepd' => 'Áo Sơ Mi Nam Dài Tay CANIFA',
                'price' => 499000,
                'saleprice' => 399000,
                'idtype' => 7,
                'img' => 'clothing/canifa-men-shirt.jpg'
            ],
            [

                'namepd' => 'Áo Khoác Dù Nam Chống Nước Coolmate',
                'price' => 699000,
                'saleprice' => 599000,
                'idtype' => 7,
                'img' => 'clothing/coolmate-waterproof-jacket.jpg'
            ],
            [

                'namepd' => 'Quần Jogger Nam Routine',
                'price' => 450000,
                'saleprice' => 399000,
                'idtype' => 7,
                'img' => 'clothing/routine-jogger-pants.jpg'
            ],
            [

                'namepd' => 'Váy Liền Nữ The Cosmo',
                'price' => 795000,
                'saleprice' => 636000,
                'idtype' => 7,
                'img' => 'clothing/thecosmo-women-dress.jpg'
            ],
            [

                'namepd' => 'Áo Sơ Mi Nữ Cộc Tay SSSTUTTER',
                'price' => 450000,
                'saleprice' => 399000,
                'idtype' => 7,
                'img' => 'clothing/ssstutter-women-shirt.jpg'
            ],
            [

                'namepd' => 'Quần Culottes Nữ Công Sở IVY moda',
                'price' => 790000,
                'saleprice' => 553000,
                'idtype' => 7,
                'img' => 'clothing/ivymoda-culottes.jpg'
            ],
            [

                'namepd' => 'Áo Thun Nữ Cotton Mango',
                'price' => 499000,
                'saleprice' => 399000,
                'idtype' => 7,
                'img' => 'clothing/mango-cotton-tshirt.jpg'
            ],
            [

                'namepd' => 'Quần Jeans Nữ Skinny H&M',
                'price' => 699000,
                'saleprice' => 499000,
                'idtype' => 7,
                'img' => 'clothing/hm-skinny-jeans.jpg'
            ],
            [

                'namepd' => 'Áo Thun Trẻ Em Disney Mickey Mouse',
                'price' => 299000,
                'saleprice' => 249000,
                'idtype' => 7,
                'img' => 'clothing/disney-mickey-kids-tshirt.jpg'
            ],
            [

                'namepd' => 'Quần Jeans Trẻ Em Rabity',
                'price' => 359000,
                'saleprice' => 299000,
                'idtype' => 7,
                'img' => 'clothing/rabity-kids-jeans.jpg'
            ],
            [

                'namepd' => 'Đầm Bé Gái Elsa Frozen Disney',
                'price' => 450000,
                'saleprice' => 399000,
                'idtype' => 7,
                'img' => 'clothing/frozen-elsa-dress.jpg'
            ],
            [

                'namepd' => 'Bộ Đồ Thể Thao Trẻ Em Olomimi',
                'price' => 399000,
                'saleprice' => 349000,
                'idtype' => 7,
                'img' => 'clothing/olomimi-sports-set.jpg'
            ],
            [

                'namepd' => 'Áo Khoác Bé Trai Supersports',
                'price' => 499000,
                'saleprice' => 429000,
                'idtype' => 7,
                'img' => 'clothing/supersports-boy-jacket.jpg'
            ],
        ];

        // Sản phẩm Gaming (idtype = 1)
        $gamingProducts = [
            // Laptops gaming
            [
                'namepd' => 'Laptop Asus ROG Zephyrus G14 (2024)',
                'price' => 1999.99,
                'saleprice' => 1899.99,
                'img' => 'asus_rog_g14_2024.jpg',
                'idtype' => 1
            ],
            [
                'namepd' => 'Laptop MSI Katana 17 (2024)',
                'price' => 1699.99,
                'saleprice' => 1599.99,
                'img' => 'msi_katana_17.jpg',
                'idtype' => 1
            ],
            [
                'namepd' => 'Laptop Lenovo Legion Pro 7i (2024)',
                'price' => 2299.99,
                'saleprice' => 2149.99,
                'img' => 'lenovo_legion_pro_7i.jpg',
                'idtype' => 1
            ],
            [
                'namepd' => 'Laptop Acer Predator Helios 18',
                'price' => 2499.99,
                'saleprice' => 2349.99,
                'img' => 'acer_predator_helios_18.jpg',
                'idtype' => 1
            ],
            [
                'namepd' => 'Laptop Razer Blade 16 (2024)',
                'price' => 2999.99,
                'saleprice' => 2849.99,
                'img' => 'razer_blade_16.jpg',
                'idtype' => 1
            ],
            [
                'namepd' => 'Laptop HP Omen 17',
                'price' => 1899.99,
                'saleprice' => 1799.99,
                'img' => 'hp_omen_17.jpg',
                'idtype' => 1
            ],
            [
                'namepd' => 'Laptop Dell Alienware m18',
                'price' => 3199.99,
                'saleprice' => 2999.99,
                'img' => 'dell_alienware_m18.jpg',
                'idtype' => 1
            ],

            // Điện thoại gaming
            [
                'namepd' => 'ASUS ROG Phone 8 Pro',
                'price' => 1299.99,
                'saleprice' => 1199.99,
                'img' => 'asus_rog_phone_8_pro.jpg',
                'idtype' => 1
            ],
            [
                'namepd' => 'Xiaomi Black Shark 6 Pro',
                'price' => 899.99,
                'saleprice' => 849.99,
                'img' => 'xiaomi_black_shark_6_pro.jpg',
                'idtype' => 1
            ],
            [
                'namepd' => 'Nubia RedMagic 9 Pro',
                'price' => 799.99,
                'saleprice' => 749.99,
                'img' => 'nubia_redmagic_9_pro.jpg',
                'idtype' => 1
            ],
            [
                'namepd' => 'iPhone 15 Pro Max',
                'price' => 1299.99,
                'saleprice' => 1249.99,
                'img' => 'iphone_15_pro_max.jpg',
                'idtype' => 1
            ],

            // Phụ kiện gaming
            [
                'namepd' => 'Chuột Logitech G Pro X Superlight 2',
                'price' => 159.99,
                'saleprice' => 139.99,
                'img' => 'logitech_gpro_x_superlight_2.jpg',
                'idtype' => 1
            ],
            [
                'namepd' => 'Bàn phím Corsair K100 RGB',
                'price' => 229.99,
                'saleprice' => 199.99,
                'img' => 'corsair_k100_rgb.jpg',
                'idtype' => 1
            ],
            [
                'namepd' => 'Tai nghe SteelSeries Arctis Nova Pro Wireless',
                'price' => 349.99,
                'saleprice' => 329.99,
                'img' => 'steelseries_arctis_nova_pro.jpg',
                'idtype' => 1
            ],
            [
                'namepd' => 'Màn hình LG UltraGear OLED 27GR95QE',
                'price' => 999.99,
                'saleprice' => 899.99,
                'img' => 'lg_ultragear_oled_27gr95qe.jpg',
                'idtype' => 1
            ],
            [
                'namepd' => 'Ghế gaming Secretlab Titan Evo 2022',
                'price' => 549.99,
                'saleprice' => 499.99,
                'img' => 'secretlab_titan_evo_2022.jpg',
                'idtype' => 1
            ],
            [
                'namepd' => 'Bàn gaming Razer Iskur',
                'price' => 499.99,
                'saleprice' => 449.99,
                'img' => 'razer_iskur.jpg',
                'idtype' => 1
            ],
            [
                'namepd' => 'Tay cầm Xbox Elite Series 2 Controller',
                'price' => 179.99,
                'saleprice' => 169.99,
                'img' => 'xbox_elite_series_2.jpg',
                'idtype' => 1
            ],
            [
                'namepd' => 'Ổ cứng SSD Samsung 990 Pro 2TB',
                'price' => 199.99,
                'saleprice' => 179.99,
                'img' => 'samsung_990_pro_2tb.jpg',
                'idtype' => 1
            ],
            [
                'namepd' => 'Card đồ họa NVIDIA GeForce RTX 4080 Super',
                'price' => 999.99,
                'saleprice' => 949.99,
                'img' => 'nvidia_rtx_4080_super.jpg',
                'idtype' => 1
            ],
            [
                'namepd' => 'Bộ tản nhiệt nước NZXT Kraken Elite 360',
                'price' => 329.99,
                'saleprice' => 299.99,
                'img' => 'nzxt_kraken_elite_360.jpg',
                'idtype' => 1
            ],
            [
                'namepd' => 'Bộ định tuyến ASUS ROG Rapture GT-AXE16000',
                'price' => 699.99,
                'saleprice' => 649.99,
                'img' => 'asus_rog_rapture_gt_axe16000.jpg',
                'idtype' => 1
            ],
            [
                'namepd' => 'Bộ nguồn Corsair RM1000x (2024)',
                'price' => 199.99,
                'saleprice' => 179.99,
                'img' => 'corsair_rm1000x_2024.jpg',
                'idtype' => 1
            ],
            [
                'namepd' => 'Vỏ máy tính Lian Li O11 Dynamic EVO RGB',
                'price' => 189.99,
                'saleprice' => 169.99,
                'img' => 'lian_li_o11_dynamic_evo.jpg',
                'idtype' => 1
            ],
            [
                'namepd' => 'RAM Corsair Vengeance RGB DDR5 32GB',
                'price' => 149.99,
                'saleprice' => 139.99,
                'img' => 'corsair_vengeance_rgb_ddr5.jpg',
                'idtype' => 1
            ],
            [
                'namepd' => 'Bàn di chuột Logitech G Powerplay',
                'price' => 119.99,
                'saleprice' => 99.99,
                'img' => 'logitech_g_powerplay.jpg',
                'idtype' => 1
            ],
        ];

        // Sản phẩm Healthy (idtype = 2)
        $healthyProducts = [
            [
                'namepd' => 'Máy chạy bộ Xiaomi WalkingPad P1 2024',
                'price' => 499.99,
                'saleprice' => 449.99,
                'img' => 'xiaomi_walkingpad_p1.jpg',
                'idtype' => 2
            ],
            [
                'namepd' => 'Đồng hồ thông minh Apple Watch Series 10',
                'price' => 499.99,
                'saleprice' => 449.99,
                'img' => 'apple_watch_series_10.jpg',
                'idtype' => 2
            ],
            [
                'namepd' => 'Máy lọc không khí Dyson Purifier Cool TP07',
                'price' => 599.99,
                'saleprice' => 549.99,
                'img' => 'dyson_purifier_cool_tp07.jpg',
                'idtype' => 2
            ],
            [
                'namepd' => 'Máy massage cầm tay Theragun Pro (Gen 5)',
                'price' => 599.99,
                'saleprice' => 549.99,
                'img' => 'theragun_pro_gen5.jpg',
                'idtype' => 2
            ],
            [
                'namepd' => 'Máy đo huyết áp Omron X7 Smart',
                'price' => 89.99,
                'saleprice' => 79.99,
                'img' => 'omron_x7_smart.jpg',
                'idtype' => 2
            ],
            [
                'namepd' => 'Máy tính lượng calo Fitbit Charge 6',
                'price' => 179.99,
                'saleprice' => 159.99,
                'img' => 'fitbit_charge_6.jpg',
                'idtype' => 2
            ],
            [
                'namepd' => 'Cân thông minh Withings Body Smart',
                'price' => 149.99,
                'saleprice' => 139.99,
                'img' => 'withings_body_smart.jpg',
                'idtype' => 2
            ],
            [
                'namepd' => 'Máy lọc nước Aqua iClean 9 chức năng',
                'price' => 399.99,
                'saleprice' => 349.99,
                'img' => 'aqua_iclean.jpg',
                'idtype' => 2
            ],
            [
                'namepd' => 'Nồi chiên không dầu Philips Airfryer XXL',
                'price' => 299.99,
                'saleprice' => 279.99,
                'img' => 'philips_airfryer_xxl.jpg',
                'idtype' => 2
            ],
            [
                'namepd' => 'Máy rung toàn thân Xiaomi Move It',
                'price' => 599.99,
                'saleprice' => 549.99,
                'img' => 'xiaomi_move_it.jpg',
                'idtype' => 2
            ],
        ];
        $skincareProducts = [
            [
                'namepd' => 'Serum The Ordinary Niacinamide 10% + Zinc 1%',
                'price' => 10.99,
                'saleprice' => 9.99,
                'img' => 'ordinary_niacinamide.jpg',
                'idtype' => 3
            ],
            [
                'namepd' => 'Kem chống nắng La Roche-Posay Anthelios UVMune 400',
                'price' => 34.99,
                'saleprice' => 29.99,
                'img' => 'laroche_posay_anthelios.jpg',
                'idtype' => 3
            ],
            [
                'namepd' => 'Sữa rửa mặt CeraVe Hydrating Cleanser',
                'price' => 15.99,
                'saleprice' => 13.99,
                'img' => 'cerave_hydrating_cleanser.jpg',
                'idtype' => 3
            ],
            [
                'namepd' => 'Kem dưỡng ẩm Laneige Water Bank Blue Hyaluronic Cream',
                'price' => 39.99,
                'saleprice' => 34.99,
                'img' => 'laneige_water_bank.jpg',
                'idtype' => 3
            ],
            [
                'namepd' => 'Mặt nạ ngủ môi Laneige Lip Sleeping Mask',
                'price' => 24.99,
                'saleprice' => 22.99,
                'img' => 'laneige_lip_mask.jpg',
                'idtype' => 3
            ],
            [
                'namepd' => 'Tẩy tế bào chết Paula\'s Choice BHA Liquid Exfoliant',
                'price' => 32.99,
                'saleprice' => 28.99,
                'img' => 'paulas_choice_bha.jpg',
                'idtype' => 3
            ],
            [
                'namepd' => 'Serum trị mụn Drunk Elephant T.L.C. Framboos',
                'price' => 89.99,
                'saleprice' => 79.99,
                'img' => 'drunk_elephant_tlc.jpg',
                'idtype' => 3
            ],
            [
                'namepd' => 'Retinol The Inkey List Retinol Serum',
                'price' => 12.99,
                'saleprice' => 11.99,
                'img' => 'inkey_list_retinol.jpg',
                'idtype' => 3
            ],
            [
                'namepd' => 'Mặt nạ đất sét Innisfree Super Volcanic Pore Clay Mask',
                'price' => 16.99,
                'saleprice' => 14.99,
                'img' => 'innisfree_clay_mask.jpg',
                'idtype' => 3
            ],
            [
                'namepd' => 'Nước hoa hồng Thayers Alcohol-Free Witch Hazel Toner',
                'price' => 11.99,
                'saleprice' => 9.99,
                'img' => 'thayers_witch_hazel.jpg',
                'idtype' => 3
            ],
        ];

        // Sản phẩm Makeup (idtype = 4)
        $makeupProducts = [
            [
                'namepd' => 'Kem nền Estée Lauder Double Wear Stay-in-Place',
                'price' => 46.99,
                'saleprice' => 42.99,
                'img' => 'estee_lauder_double_wear.jpg',
                'idtype' => 4
            ],
            [
                'namepd' => 'Phấn phủ Laura Mercier Translucent Loose Setting Powder',
                'price' => 39.99,
                'saleprice' => 37.99,
                'img' => 'laura_mercier_powder.jpg',
                'idtype' => 4
            ],
            [
                'namepd' => 'Phấn mắt Urban Decay Naked Heat Eyeshadow Palette',
                'price' => 54.99,
                'saleprice' => 49.99,
                'img' => 'urban_decay_naked_heat.jpg',
                'idtype' => 4
            ],
            [
                'namepd' => 'Mascara Maybelline Lash Sensational Sky High Waterproof',
                'price' => 12.99,
                'saleprice' => 10.99,
                'img' => 'maybelline_sky_high.jpg',
                'idtype' => 4
            ],
            [
                'namepd' => 'Son môi Dior Addict Lip Glow Oil',
                'price' => 38.99,
                'saleprice' => 35.99,
                'img' => 'dior_lip_glow_oil.jpg',
                'idtype' => 4
            ],
            [
                'namepd' => 'Kẻ mắt Fenty Beauty Flyliner Longwear Liquid Eyeliner',
                'price' => 23.99,
                'saleprice' => 21.99,
                'img' => 'fenty_flyliner.jpg',
                'idtype' => 4
            ],
            [
                'namepd' => 'Kem nền mỏng nhẹ Rare Beauty Positive Light Tinted Moisturizer',
                'price' => 29.99,
                'saleprice' => 27.99,
                'img' => 'rare_beauty_tinted.jpg',
                'idtype' => 4
            ],
            [
                'namepd' => 'Má hồng NARS Orgasm Blush',
                'price' => 32.99,
                'saleprice' => 30.99,
                'img' => 'nars_orgasm_blush.jpg',
                'idtype' => 4
            ],
            [
                'namepd' => 'Kem che khuyết điểm Tarte Shape Tape Concealer',
                'price' => 29.99,
                'saleprice' => 26.99,
                'img' => 'tarte_shape_tape.jpg',
                'idtype' => 4
            ],
            [
                'namepd' => 'Chì kẻ mày Anastasia Beverly Hills Brow Wiz',
                'price' => 23.99,
                'saleprice' => 21.99,
                'img' => 'abh_brow_wiz.jpg',
                'idtype' => 4
            ],
            [
                'namepd' => 'Bút kẻ môi Charlotte Tilbury Lip Cheat Lip Liner',
                'price' => 24.99,
                'saleprice' => 22.99,
                'img' => 'charlotte_tilbury_lip_liner.jpg',
                'idtype' => 4
            ],
            [
                'namepd' => 'Highlight Becca Shimmering Skin Perfector Pressed',
                'price' => 39.99,
                'saleprice' => 36.99,
                'img' => 'becca_highlight.jpg',
                'idtype' => 4
            ],
            [
                'namepd' => 'Phấn má hồng dạng kem Rare Beauty Soft Pinch Liquid Blush',
                'price' => 22.99,
                'saleprice' => 20.99,
                'img' => 'rare_beauty_liquid_blush.jpg',
                'idtype' => 4
            ],
            [
                'namepd' => 'Son môi MAC Retro Matte Lipstick',
                'price' => 19.99,
                'saleprice' => 17.99,
                'img' => 'mac_retro_matte.jpg',
                'idtype' => 4
            ],
            [
                'namepd' => 'Primer Pat McGrath Labs Skin Fetish: Sublime Perfection Primer',
                'price' => 38.99,
                'saleprice' => 34.99,
                'img' => 'pat_mcgrath_primer.jpg',
                'idtype' => 4
            ],
        ];
        $electronicProducts = [
            [
                'namepd' => 'Tai nghe Sony WH-1000XM5',
                'price' => 399.99,
                'saleprice' => 349.99,
                'img' => 'sony_wh1000xm5.jpg',
                'idtype' => 5
            ],
            [
                'namepd' => 'Máy tính bảng Apple iPad Pro M4 12.9 inch',
                'price' => 1299.99,
                'saleprice' => 1199.99,
                'img' => 'ipad_pro_m4.jpg',
                'idtype' => 5
            ],
            [
                'namepd' => 'Loa thông minh Amazon Echo Show 10',
                'price' => 249.99,
                'saleprice' => 219.99,
                'img' => 'echo_show_10.jpg',
                'idtype' => 5
            ],
            [
                'namepd' => 'Đồng hồ thông minh Samsung Galaxy Watch 7',
                'price' => 349.99,
                'saleprice' => 299.99,
                'img' => 'galaxy_watch_7.jpg',
                'idtype' => 5
            ],
            [
                'namepd' => 'Robot hút bụi Ecovacs Deebot X2 Omni',
                'price' => 1299.99,
                'saleprice' => 1199.99,
                'img' => 'ecovacs_deebot_x2.jpg',
                'idtype' => 5
            ],
            [
                'namepd' => 'Máy ảnh không gương lật Sony Alpha 7S III',
                'price' => 3499.99,
                'saleprice' => 3299.99,
                'img' => 'sony_a7siii.jpg',
                'idtype' => 5
            ],
            [
                'namepd' => 'Máy chiếu BenQ TK850i 4K HDR',
                'price' => 1699.99,
                'saleprice' => 1499.99,
                'img' => 'benq_tk850i.jpg',
                'idtype' => 5
            ],
            [
                'namepd' => 'TV OLED LG G4 65 inch',
                'price' => 2499.99,
                'saleprice' => 2299.99,
                'img' => 'lg_g4_oled.jpg',
                'idtype' => 5
            ],
            [
                'namepd' => 'Loa di động Bang & Olufsen Beosound A5',
                'price' => 899.99,
                'saleprice' => 849.99,
                'img' => 'beosound_a5.jpg',
                'idtype' => 5
            ],
            [
                'namepd' => 'Ổ cứng SSD di động Samsung T9 4TB',
                'price' => 449.99,
                'saleprice' => 399.99,
                'img' => 'samsung_t9_ssd.jpg',
                'idtype' => 5
            ],
        ];
        $giadungProducts = [
            // Đồ dùng nhà bếp
            [
                'namepd' => 'Bộ dao nhà bếp Zwilling Pro 7 món',
                'price' => 399.99,
                'saleprice' => 349.99,
                'img' => 'zwilling_pro_knives.jpg',
                'idtype' => 6
            ],
            [
                'namepd' => 'Kéo đa năng KitchenAid Classic',
                'price' => 19.99,
                'saleprice' => 16.99,
                'img' => 'kitchenaid_scissors.jpg',
                'idtype' => 6
            ],
            [
                'namepd' => 'Bộ nồi chảo chống dính T-fal Ultimate 12 món',
                'price' => 199.99,
                'saleprice' => 179.99,
                'img' => 'tfal_cookware.jpg',
                'idtype' => 6
            ],
            [
                'namepd' => 'Máy xay sinh tố Vitamix 5200',
                'price' => 499.99,
                'saleprice' => 459.99,
                'img' => 'vitamix_5200.jpg',
                'idtype' => 6
            ],
            [
                'namepd' => 'Máy pha cà phê Breville Barista Express',
                'price' => 699.99,
                'saleprice' => 649.99,
                'img' => 'breville_barista.jpg',
                'idtype' => 6
            ],
            [
                'namepd' => 'Nồi cơm điện Zojirushi Neuro Fuzzy',
                'price' => 189.99,
                'saleprice' => 169.99,
                'img' => 'zojirushi_rice.jpg',
                'idtype' => 6
            ],
            [
                'namepd' => 'Lò nướng bánh Cuisinart Chef\'s Convection',
                'price' => 299.99,
                'saleprice' => 269.99,
                'img' => 'cuisinart_oven.jpg',
                'idtype' => 6
            ],
            [
                'namepd' => 'Thớt gỗ John Boos Edge-Grain',
                'price' => 99.99,
                'saleprice' => 89.99,
                'img' => 'john_boos_board.jpg',
                'idtype' => 6
            ],
            [
                'namepd' => 'Bộ cân nhà bếp OXO Good Grips',
                'price' => 49.99,
                'saleprice' => 44.99,
                'img' => 'oxo_scale.jpg',
                'idtype' => 6
            ],
            [
                'namepd' => 'Máy rửa bát Bosch 800 Series',
                'price' => 999.99,
                'saleprice' => 899.99,
                'img' => 'bosch_dishwasher.jpg',
                'idtype' => 6
            ],

            // Nội thất và đồ gia dụng
            [
                'namepd' => 'Bàn ăn gỗ sồi Herman Miller',
                'price' => 899.99,
                'saleprice' => 849.99,
                'img' => 'herman_miller_table.jpg',
                'idtype' => 6
            ],
            [
                'namepd' => 'Bộ 6 ghế ăn Ikea EKEDALEN',
                'price' => 599.99,
                'saleprice' => 549.99,
                'img' => 'ikea_ekedalen.jpg',
                'idtype' => 6
            ],
            [
                'namepd' => 'Ghế sofa góc IKEA SÖDERHAMN',
                'price' => 1499.99,
                'saleprice' => 1399.99,
                'img' => 'ikea_soderhamn.jpg',
                'idtype' => 6
            ],
            [
                'namepd' => 'Tủ quần áo 4 cánh IKEA PAX',
                'price' => 699.99,
                'saleprice' => 649.99,
                'img' => 'ikea_pax.jpg',
                'idtype' => 6
            ],
            [
                'namepd' => 'Bàn làm việc Herman Miller Aeron',
                'price' => 899.99,
                'saleprice' => 849.99,
                'img' => 'herman_miller_desk.jpg',
                'idtype' => 6
            ],
            [
                'namepd' => 'Đèn sàn Philips Hue White and Color',
                'price' => 199.99,
                'saleprice' => 179.99,
                'img' => 'philips_hue_floor.jpg',
                'idtype' => 6
            ],
            [
                'namepd' => 'Kệ sách 5 tầng IKEA BILLY',
                'price' => 149.99,
                'saleprice' => 129.99,
                'img' => 'ikea_billy.jpg',
                'idtype' => 6
            ],
            [
                'namepd' => 'Giường ngủ king size Tempur-Pedic',
                'price' => 1999.99,
                'saleprice' => 1799.99,
                'img' => 'tempurpedic_bed.jpg',
                'idtype' => 6
            ],
            [
                'namepd' => 'Tủ lạnh Samsung Family Hub',
                'price' => 3299.99,
                'saleprice' => 2999.99,
                'img' => 'samsung_family_hub.jpg',
                'idtype' => 6
            ],
            [
                'namepd' => 'Máy giặt LG Signature',
                'price' => 1899.99,
                'saleprice' => 1699.99,
                'img' => 'lg_signature_washer.jpg',
                'idtype' => 6
            ],

            // Đồ dùng gia đình khác
            [
                'namepd' => 'Bộ chăn ga gối Brooklinen Luxe',
                'price' => 299.99,
                'saleprice' => 269.99,
                'img' => 'brooklinen_bedding.jpg',
                'idtype' => 6
            ],
            [
                'namepd' => 'Gối ngủ Tempur-Pedic TEMPUR-Cloud',
                'price' => 129.99,
                'saleprice' => 109.99,
                'img' => 'tempurpedic_pillow.jpg',
                'idtype' => 6
            ],
            [
                'namepd' => 'Thảm phòng khách Safavieh Madison',
                'price' => 299.99,
                'saleprice' => 269.99,
                'img' => 'safavieh_rug.jpg',
                'idtype' => 6
            ],
            [
                'namepd' => 'Máy hút bụi Dyson V15 Detect',
                'price' => 749.99,
                'saleprice' => 699.99,
                'img' => 'dyson_v15.jpg',
                'idtype' => 6
            ],
            [
                'namepd' => 'Bàn ủi hơi nước Rowenta Perfect Steam Pro',
                'price' => 149.99,
                'saleprice' => 129.99,
                'img' => 'rowenta_iron.jpg',
                'idtype' => 6
            ],
            [
                'namepd' => 'Máy lọc không khí Coway Airmega 400',
                'price' => 499.99,
                'saleprice' => 449.99,
                'img' => 'coway_airmega.jpg',
                'idtype' => 6
            ],
            [
                'namepd' => 'Máy làm mát không khí Dyson Pure Cool',
                'price' => 549.99,
                'saleprice' => 499.99,
                'img' => 'dyson_pure_cool.jpg',
                'idtype' => 6
            ],
            [
                'namepd' => 'Bình đun nước điện Smeg',
                'price' => 169.99,
                'saleprice' => 149.99,
                'img' => 'smeg_kettle.jpg',
                'idtype' => 6
            ],
            [
                'namepd' => 'Máy pha cà phê viên nén Nespresso Vertuo Next',
                'price' => 199.99,
                'saleprice' => 179.99,
                'img' => 'nespresso_vertuo.jpg',
                'idtype' => 6
            ],
            [
                'namepd' => 'Máy lọc nước Berkey Big Berkey',
                'price' => 359.99,
                'saleprice' => 329.99,
                'img' => 'big_berkey.jpg',
                'idtype' => 6
            ],
            [
                'namepd' => 'Bộ dao kéo Cutco Homemaker+8',
                'price' => 999.99,
                'saleprice' => 899.99,
                'img' => 'cutco_homemaker.jpg',
                'idtype' => 6
            ],
            [
                'namepd' => 'Bộ nồi áp suất Instant Pot Pro Crisp',
                'price' => 249.99,
                'saleprice' => 219.99,
                'img' => 'instant_pot_pro.jpg',
                'idtype' => 6
            ],
            [
                'namepd' => 'Máy sấy tóc Dyson Supersonic',
                'price' => 429.99,
                'saleprice' => 399.99,
                'img' => 'dyson_supersonic.jpg',
                'idtype' => 6
            ],
            [
                'namepd' => 'Máy vắt cam Smeg CJF01',
                'price' => 169.99,
                'saleprice' => 149.99,
                'img' => 'smeg_juicer.jpg',
                'idtype' => 6
            ],
        ];


        $allProducts = array_merge($clothing, $gamingProducts, $healthyProducts, $skincareProducts, $makeupProducts, $electronicProducts, $giadungProducts);
        // Thêm vào CSDL
        DB::table('product')->insert($allProducts);
    }
}
